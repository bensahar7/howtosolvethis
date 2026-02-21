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
  
  // Parse keywords - support both formats
  const keywordsMatch = content.match(/\*\*Keywords:\*\*\s*(.+?)$/m) || content.match(/keywords:\s*(.+)$/m);
  const keywords: (string | BilingualTag)[] = keywordsMatch 
    ? keywordsMatch[1].split(/[,،]/).map(k => k.trim()).filter(Boolean)
    : [];

  return {
    episodeNumber,
    title: titleMatch ? titleMatch[1].replace(/Episode \d+:\s*/i, "").trim() : `Episode ${episodeNumber}`,
    guests: guestsMatch ? guestsMatch[1].split(/[,،]/).map(g => g.replace(/[\[\]"]/g, "").trim()).filter(Boolean) : [],
    sector: getMatch(/\*\*(?:Sectors?|Topic):\*\*\s*(.+?)$/m) || getMatch(/sector:\s*(.+)$/m),
    keywords: keywords,
    problem: (content.match(/##\s+The Problem[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim().substring(0, 300),
    solution: (content.match(/##\s+The Solution[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim().substring(0, 300),
    companyName: getMatch(/\*\*Company Name:\*\*\s*(.+?)$/m) || getMatch(/companyName:\s*(.+)$/m),
    companyLogo: getMatch(/\*\*Company Logo:\*\*\s*(.+?)$/m) || getMatch(/companyLogo:\s*(.+)$/m),
    entrepreneurInsight: (content.match(/##\s+Entrepreneur Insight[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim(),
    entrepreneurTip: (content.match(/##\s+Entrepreneur Insight[\s\S]*?\n([\s\S]*?)(?=\n##|$)/) || ["", ""])[1].trim(),
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