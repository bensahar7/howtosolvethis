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
    const transcriptPath = path.join(EPISODES_DIR, targetFolder, "transcript.txt");
    
    // Read file with UTF-8 encoding
    let content = await fs.readFile(transcriptPath, "utf-8");
    
    // Strip BOM if present
    content = content.replace(/^\uFEFF/, "");
    
    // Clean up extra whitespace
    content = content.trim();
    
    return content || null;
  } catch (error) {
    console.warn(`Transcript not found for episode ${episodeNumber}:`, error);
    return null;
  }
}
