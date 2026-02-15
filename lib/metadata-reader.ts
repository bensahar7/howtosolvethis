import fs from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import { LocalMetadata, BilingualTag, CompanyInfo, ResearcherInfo } from "@/types/episode";

const EPISODES_DIR = path.join(process.cwd(), "Context", "Episodes");

/**
 * Parse a meta.md.txt file and extract structured metadata
 */
function parseMetadataFile(content: string, episodeNumber: number): LocalMetadata {
  const lines = content.split("\n");
  
  let title = "";
  let guests: string[] = [];
  let sector = "";
  let keywords: (string | BilingualTag)[] = [];
  let problem = "";
  let solution = "";
  let entrepreneurInsight = "";
  let guestLinkedIn: string[] = [];
  let companyWebsite = "";
  let companyName = "";
  let companyLogo = "";

  // NEW: Multi-company support
  let researcher: ResearcherInfo | undefined = undefined;
  let companies: CompanyInfo[] = [];

  // Extract title from first heading
  const titleMatch = content.match(/^#\s+(.+?)$/m);
  if (titleMatch) {
    title = titleMatch[1].replace(/Episode \d+:\s*/i, "").trim();
  }

  // Extract guests - handle multiple formats: "Guest:", "Guests:", "Key Experts:"
  const guestsMatch = content.match(/\*\*(?:Guests?|Key Experts?):\*\*\s*(.+?)$/m);
  if (guestsMatch) {
    const guestText = guestsMatch[1].trim();
    // Remove parenthetical English names if present
    const cleanedText = guestText.replace(/\([^)]*\)/g, '').trim();
    guests = cleanedText
      .split(/[,،]/)
      .map((g) => g.trim())
      .filter(Boolean);
  }

  // Extract sector - handle both "Sector:" and "Sectors:" and "Topic:"
  const sectorMatch = content.match(/\*\*(?:Sectors?|Topic):\*\*\s*(.+?)$/m);
  if (sectorMatch) {
    // Split by / or comma and take first sector, clean it up
    const sectors = sectorMatch[1].split(/\s*[\/,]\s*/);
    sector = sectors[0].trim();
  }

  // Extract keywords - Support both legacy strings and bilingual objects
  // Format 1 (legacy): **Keywords:** Climate Tech, Carbon Footprint
  // Format 2 (bilingual): **Keywords:** קליימט-טק/Climate Tech, טביעת רגל פחמנית/Carbon Footprint
  const keywordsMatch = content.match(/\*\*Keywords:\*\*\s*(.+?)$/m);
  if (keywordsMatch) {
    const keywordText = keywordsMatch[1];
    const keywordParts = keywordText.split(/[,،]/).map((k) => k.trim()).filter(Boolean);
    
    keywords = keywordParts.map((keyword) => {
      // Check if keyword contains bilingual format (Hebrew/English)
      const bilingualMatch = keyword.match(/^(.+?)\s*\/\s*(.+?)$/);
      if (bilingualMatch) {
        const [, he, en] = bilingualMatch;
        return {
          he: he.trim(),
          en: en.trim()
        };
      }
      // Legacy format - just return as string
      return keyword;
    });
  }

  // Extract problem section
  const problemMatch = content.match(/##\s+The Problem[^\n]*\n([\s\S]*?)(?=\n##|$)/);
  if (problemMatch) {
    problem = problemMatch[1].trim().substring(0, 300); // First 300 chars
  }

  // Extract solution section
  const solutionMatch = content.match(/##\s+The Solution[^\n]*\n([\s\S]*?)(?=\n##|$)/);
  if (solutionMatch) {
    solution = solutionMatch[1].trim().substring(0, 300);
  }

  // Extract entrepreneur insight
  const insightMatch = content.match(/##\s+Entrepreneur Insight[^\n]*\n([\s\S]*?)(?=\n##|$)/);
  if (insightMatch) {
    entrepreneurInsight = insightMatch[1].trim();
  }

  // =========================================
  // NEW: Parse Researcher Info
  // =========================================
  const researcherMatch = content.match(/\*\*(?:Researcher|Resercher):\*\*\s*(.+?)$/m); // Note: typo-tolerant
  if (researcherMatch) {
    const researcherName = researcherMatch[1].trim();
    
    // Extract researcher LinkedIn
    const researcherLinkedInMatch = content.match(/\*\*Researcher LinkedIn:\*\*\s*(.+?)$/m);
    
    // Extract researcher Google Scholar
    const researcherGoogleScholarMatch = content.match(/\*\*Researcher Google Scholar:\*\*\s*(.+?)$/m);
    
    // Extract researcher website
    const researcherWebsiteMatch = content.match(/\*\*Researcher Website:\*\*\s*(.+?)$/m);
    
    researcher = {
      name: researcherName,
      linkedIn: researcherLinkedInMatch ? researcherLinkedInMatch[1].trim() : undefined,
      title: undefined, // Can be manually added later
      affiliation: undefined,
      googleScholar: researcherGoogleScholarMatch ? researcherGoogleScholarMatch[1].trim() : undefined,
      website: researcherWebsiteMatch ? researcherWebsiteMatch[1].trim() : undefined,
    };
  }

  // =========================================
  // NEW: Parse Multi-Company Info
  // =========================================
  // Format:
  // - **Company Name 1:** BeeHero
  // - **Company 1 Logo:** logo1.jpeg
  // - **Guests:** Avner Einav, Ido Shuki (parsed above)
  // We'll parse up to 5 companies (Company 1, Company 2, ..., Company 5)
  
  for (let i = 1; i <= 5; i++) {
    const companyNameMatch = content.match(new RegExp(`\\*\\*Company Name ${i}:\\*\\*\\s*(.+?)$`, 'm'));
    const companyLogoMatch = content.match(new RegExp(`\\*\\*Company ${i} Logo:\\*\\*\\s*(.+?)$`, 'm'));
    const companyWebsiteMatch = content.match(new RegExp(`\\*\\*Company ${i} Website:\\*\\*\\s*(.+?)$`, 'm'));
    const companyFocusMatch = content.match(new RegExp(`\\*\\*Company ${i} Focus:\\*\\*\\s*(.+?)$`, 'm'));
    const companyGuestMatch = content.match(new RegExp(`\\*\\*Company ${i} Guest:\\*\\*\\s*(.+?)$`, 'm'));
    const companyGuestTitleMatch = content.match(new RegExp(`\\*\\*Company ${i} Guest Title:\\*\\*\\s*(.+?)$`, 'm'));
    const companyGuestLinkedInMatch = content.match(new RegExp(`\\*\\*Company ${i} Guest LinkedIn:\\*\\*\\s*(.+?)$`, 'm'));

    if (companyNameMatch) {
      companies.push({
        name: companyNameMatch[1].trim(),
        logo: companyLogoMatch ? companyLogoMatch[1].trim() : '',
        website: companyWebsiteMatch ? companyWebsiteMatch[1].trim() : undefined,
        guestName: companyGuestMatch ? companyGuestMatch[1].trim() : guests[i - 1] || '', // Fallback to guests array
        guestLinkedIn: companyGuestLinkedInMatch ? companyGuestLinkedInMatch[1].trim() : undefined,
        guestTitle: companyGuestTitleMatch ? companyGuestTitleMatch[1].trim() : undefined,
        focus: companyFocusMatch ? companyFocusMatch[1].trim() : undefined,
      });
    }
  }

  // =========================================
  // LEGACY: Single-Company Support (Backward Compatibility)
  // =========================================
  // Extract LinkedIn URLs (supports comma-separated for multiple guests)
  const linkedInMatch = content.match(/\*\*Guest LinkedIn:\*\*\s*(.+?)$/m);
  if (linkedInMatch) {
    guestLinkedIn = linkedInMatch[1]
      .split(/[,،]/)
      .map((url) => url.trim())
      .filter(Boolean);
  }

  // Extract Company Website
  const companyMatch = content.match(/\*\*Company Website:\*\*\s*(.+?)$/m);
  if (companyMatch) {
    companyWebsite = companyMatch[1].trim();
  }

  // Extract Company Name
  const companyNameMatch = content.match(/\*\*Company Name:\*\*\s*(.+?)$/m);
  if (companyNameMatch) {
    companyName = companyNameMatch[1].trim();
  }

  // Extract Company Logo filename
  const logoMatch = content.match(/\*\*Company Logo:\*\*\s*(.+?)$/m);
  if (logoMatch) {
    companyLogo = logoMatch[1].trim();
  }

  return {
    episodeNumber,
    title,
    guests,
    sector,
    keywords,
    problem,
    solution,
    entrepreneurInsight,
    
    // NEW fields
    researcher: researcher,
    companies: companies.length > 0 ? companies : undefined,
    
    // LEGACY fields (keep for backward compatibility)
    guestLinkedIn: guestLinkedIn.length > 0 ? guestLinkedIn : undefined,
    companyWebsite: companyWebsite || undefined,
    companyName: companyName || undefined,
    companyLogo: companyLogo || undefined,
  };
}

/**
 * Read all local episode metadata files
 * Cached for 1 hour to improve performance
 */
async function getAllLocalMetadataUncached(): Promise<LocalMetadata[]> {
  try {
    const entries = await fs.readdir(EPISODES_DIR, { withFileTypes: true });
    const episodeDirs = entries.filter((entry) => entry.isDirectory());

    const metadataPromises = episodeDirs.map(async (dir) => {
      const episodePath = path.join(EPISODES_DIR, dir.name);
      
      // Try to find meta.md.txt or mark.txt
      let metaFile = "meta.md.txt";
      try {
        await fs.access(path.join(episodePath, metaFile));
      } catch {
        metaFile = "mark.txt";
      }

      try {
        const content = await fs.readFile(
          path.join(episodePath, metaFile),
          "utf-8"
        );

        // Extract episode number from TITLE in file (more accurate than folder name)
        const titleMatch = content.match(/^#\s+Episode\s+(\d+):/im);
        let episodeNumber = titleMatch ? parseInt(titleMatch[1], 10) : 0;
        
        // Fallback: try Hebrew "פרק"
        if (!episodeNumber) {
          const hebrewMatch = content.match(/^#\s+פרק\s+(\d+):/im);
          episodeNumber = hebrewMatch ? parseInt(hebrewMatch[1], 10) : 0;
        }
        
        // Last resort: extract from directory name
        if (!episodeNumber) {
          const dirMatch = dir.name.match(/ep(\d+)/i);
          episodeNumber = dirMatch ? parseInt(dirMatch[1], 10) : 0;
        }

        const parsed = parseMetadataFile(content, episodeNumber);
        
        // Add folder name for manual mapping
        parsed.folderName = dir.name;

        return parsed;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Error reading metadata for ${dir.name}:`, error);
        }
        return null;
      }
    });

    const metadata = await Promise.all(metadataPromises);
    return metadata.filter((m): m is LocalMetadata => m !== null);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error reading local metadata:", error);
    }
    return [];
  }
}

export const getAllLocalMetadata = unstable_cache(
  getAllLocalMetadataUncached,
  ['local-metadata'],
  { revalidate: 3600, tags: ['metadata'] }
);

/**
 * Get metadata for a specific episode by number
 */
export async function getMetadataByEpisode(
  episodeNumber: number
): Promise<LocalMetadata | null> {
  const allMetadata = await getAllLocalMetadata();
  return allMetadata.find((m) => m.episodeNumber === episodeNumber) || null;
}
