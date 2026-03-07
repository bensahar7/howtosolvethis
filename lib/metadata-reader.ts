import fs from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import { LocalMetadata, BilingualTag } from "@/types/episode";

const EPISODES_DIR = path.join(process.cwd(), "Context", "Episodes");

function parseMetadataFile(content: string, episodeNumber: number): LocalMetadata {
  const getMatch = (regex: RegExp) => {
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  };

  // תמיכה בפורמט YAML (ללא כוכביות) ובפורמט Bold (עם כוכביות)
  const titleMatch = content.match(/^#\s+(.+?)$/m) || content.match(/title:\s*(.+)$/m);
  const guestsMatch = content.match(/\*\*(?:Guests?):\*\*\s*(.+?)$/m) || content.match(/guests:\s*\[?(.+?)\]?$/m);
  
  // Parse guest LinkedIn - support both formats
  const guestLinkedInMatch = content.match(/\*\*Guest LinkedIn:\*\*\s*(.+?)$/m) || content.match(/guestLinkedIn:\s*(.+)$/m);
  const guestLinkedIn = guestLinkedInMatch 
    ? guestLinkedInMatch[1].split(/[,،]/).map(url => url.trim()).filter(Boolean)
    : undefined;
  
  // Parse keywords - support both formats
  const keywordsMatch = content.match(/\*\*Keywords:\*\*\s*(.+?)$/m) || content.match(/keywords:\s*(.+)$/m);
  const keywords: (string | BilingualTag)[] = keywordsMatch 
    ? keywordsMatch[1].split(/[,،]/).map(k => k.trim()).filter(Boolean)
    : [];

  // Helper function to clean markdown formatting (remove ** and other markdown syntax)
  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*\*/g, '') // Remove triple asterisks
      .replace(/\*\*/g, '')   // Remove double asterisks (bold)
      .replace(/\*/g, '')     // Remove single asterisks (italic)
      .trim();
  };

  // Parse problem and solution with markdown cleaning
  const problemRaw = (content.match(/##\s+The Problem[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim();
  const solutionRaw = (content.match(/##\s+The Solution[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim();

  // Parse researcher information (NEW FORMAT)
  const researcherName = getMatch(/\*\*Researcher:\*\*\s*(.+?)$/m) || getMatch(/researcher:\s*(.+)$/m);
  let researcher: LocalMetadata['researcher'] = undefined;
  
  if (researcherName) {
    researcher = {
      name: researcherName,
      linkedIn: getMatch(/\*\*Researcher LinkedIn:\*\*\s*(.+?)$/m) || undefined,
      googleScholar: getMatch(/\*\*Researcher Google Scholar:\*\*\s*(.+?)$/m) || undefined,
      website: getMatch(/\*\*Researcher Website:\*\*\s*(.+?)$/m) || undefined,
      affiliation: getMatch(/\*\*Researcher Affiliation:\*\*\s*(.+?)$/m) || undefined,
      title: getMatch(/\*\*Researcher Title:\*\*\s*(.+?)$/m) || undefined,
    };
  }

  // Parse multi-company format (NEW FORMAT)
  const companies: LocalMetadata['companies'] = [];
  let companyIndex = 1;
  
  while (true) {
    const companyName = getMatch(new RegExp(`\\*\\*Company Name ${companyIndex}:\\*\\*\\s*(.+?)$`, 'm')) 
                     || getMatch(new RegExp(`\\*\\*Company ${companyIndex} Name:\\*\\*\\s*(.+?)$`, 'm'));
    
    if (!companyName) break; // No more companies
    
    const company = {
      name: companyName,
      logo: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Logo:\\*\\*\\s*(.+?)$`, 'm')) || '',
      website: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Website:\\*\\*\\s*(.+?)$`, 'm')),
      guestName: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Guest:\\*\\*\\s*(.+?)$`, 'm')) || '',
      guestLinkedIn: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Guest LinkedIn:\\*\\*\\s*(.+?)$`, 'm')),
      guestTitle: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Guest Title:\\*\\*\\s*(.+?)$`, 'm')),
      focus: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Focus:\\*\\*\\s*(.+?)$`, 'm')),
      sector: getMatch(new RegExp(`\\*\\*Company ${companyIndex} Sector:\\*\\*\\s*(.+?)$`, 'm')),
    };
    
    companies.push(company);
    companyIndex++;
  }

  return {
    episodeNumber,
    title: titleMatch ? titleMatch[1].replace(/Episode \d+:\s*/i, "").trim() : `Episode ${episodeNumber}`,
    guests: guestsMatch ? guestsMatch[1].split(/[,،]/).map(g => g.replace(/[\[\]"]/g, "").trim()).filter(Boolean) : [],
    guestLinkedIn: guestLinkedIn,
    sector: getMatch(/\*\*(?:Sectors?|Topic):\*\*\s*(.+?)$/m) || getMatch(/sector:\s*(.+)$/m),
    keywords: keywords,
    problem: cleanMarkdown(problemRaw).substring(0, 500),
    solution: cleanMarkdown(solutionRaw).substring(0, 500),
    companyName: getMatch(/\*\*Company Name:\*\*\s*(.+?)$/m) || getMatch(/companyName:\s*(.+)$/m),
    companyWebsite: getMatch(/\*\*Company Website:\*\*\s*(.+?)$/m) || getMatch(/companyWebsite:\s*(.+)$/m),
    companyLogo: getMatch(/\*\*Company Logo:\*\*\s*(.+?)$/m) || getMatch(/companyLogo:\s*(.+)$/m),
    entrepreneurInsight: (content.match(/##\s+Entrepreneur Insight[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim(),
    entrepreneurTip: (content.match(/##\s+Entrepreneur Insight[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim(),
    researcher: researcher,
    companies: companies.length > 0 ? companies : undefined,
  };
}

async function getAllLocalMetadataUncached(): Promise<LocalMetadata[]> {
  try {
    const entries = await fs.readdir(EPISODES_DIR, { withFileTypes: true });
    const episodeDirs = entries.filter((entry) => entry.isDirectory());

    const metadataPromises = episodeDirs.map(async (dir) => {
      const episodePath = path.join(EPISODES_DIR, dir.name);
      const possibleFiles = ["meta.md.txt", "meta.md"];
      let content = "";
      for (const file of possibleFiles) {
        try {
          content = await fs.readFile(path.join(episodePath, file), "utf-8");
          break;
        } catch { continue; }
      }
      if (!content) return null;

      const numMatch = content.match(/(?:Episode|פרק|episodeNumber:)\s*(\d+)/i);
      const episodeNumber = numMatch ? parseInt(numMatch[1], 10) : parseInt(dir.name.match(/\d+/)?.[0] || "0", 10);
      
      const parsed = parseMetadataFile(content, episodeNumber);
      parsed.folderName = dir.name;
      return parsed;
    });

    const results = await Promise.all(metadataPromises);
    return results.filter((m): m is LocalMetadata => m !== null);
  } catch (error) {
    console.error("Metadata reader error:", error);
    return [];
  }
}

export const getAllLocalMetadata = unstable_cache(getAllLocalMetadataUncached, ['local-metadata'], { revalidate: 60 });