import fs from "fs/promises";
import path from "path";

/**
 * Read and decode transcript with proper UTF-8 BOM handling
 */
export async function getTranscriptByEpisode(
  episodeNumber: number,
  folderName?: string
): Promise<string | null> {
  try {
    const EPISODES_DIR = path.join(process.cwd(), "Context", "Episodes");
    
    // Use folderName if provided, otherwise try to match by episode number
    const targetFolder = folderName || `ep${episodeNumber}`;
    
    // Try multiple transcript file extensions (.md, .txt)
    const possibleFiles = ["transcript.md", "transcript.txt"];
    let content: string | null = null;
    
    for (const fileName of possibleFiles) {
      try {
        const transcriptPath = path.join(EPISODES_DIR, targetFolder, fileName);
        content = await fs.readFile(transcriptPath, "utf-8");
        break; // Found the file, stop searching
      } catch {
        // File not found, try next extension
        continue;
      }
    }
    
    if (!content) {
      throw new Error(`No transcript file found in ${targetFolder}`);
    }
    
    // Strip BOM if present
    content = content.replace(/^\uFEFF/, "");
    
    // Clean up extra whitespace
    content = content.trim();
    
    return content || null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Transcript not found for episode ${episodeNumber}:`, error);
    }
    return null;
  }
}
