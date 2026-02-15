# -*- coding: utf-8 -*-
"""
Transcript Processor - Converts raw podcast transcripts to Q&A format
Follows the Transcript Architect Agent rules for Hebrew content
"""

import os
import re
from pathlib import Path

# Hebrew filler words to remove
FILLER_WORDS = [
    r'\bאה\b',
    r'\bאממ+\b',
    r'\bכאילו\b',
    r'\bכאילו כזה\b',
    r'\bאממם+\b',
    r'\bה+מ+\b',
]

# Production notes patterns to remove
PRODUCTION_PATTERNS = [
    r'\d{2}:\d{2}\s*-\s*',  # Timestamps like "00:12 - "
    r'\[\w+\](?=\s*\n)',  # Bracketed notes on their own line like [a], [b]
    r'אופציה \w+\'*-?\s*',  # "אופציה א'-" type markers
]

def remove_filler_words(text):
    """Remove Hebrew filler words and verbal tics"""
    for pattern in FILLER_WORDS:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    # Remove multiple spaces
    text = re.sub(r' +', ' ', text)
    # Remove spaces before punctuation
    text = re.sub(r' +([,\.!?])', r'\1', text)
    
    return text

def clean_production_notes(text):
    """Remove timestamps, production notes, and annotations"""
    for pattern in PRODUCTION_PATTERNS:
        text = re.sub(pattern, '', text, flags=re.MULTILINE)
    
    # Remove lines with only brackets and letters (like "[a]", "[b][c]")
    text = re.sub(r'^[\[\]\w\s]+$', '', text, flags=re.MULTILINE)
    
    return text

def identify_speaker(line):
    """Identify if line contains a speaker label"""
    # Check for existing formatted speakers
    if re.match(r'\[.+?\]:', line):
        return True
    
    # Check for common speaker patterns
    speaker_patterns = [
        r'^(בן|איתמר|מנחים):\s*',
        r'^[א-ת\s]{2,30}:\s*',  # Hebrew name followed by colon
    ]
    
    for pattern in speaker_patterns:
        if re.match(pattern, line.strip()):
            return True
    
    return False

def format_speaker_label(speaker_text):
    """Format speaker name into [Speaker]: format"""
    speaker_text = speaker_text.strip().rstrip(':').strip()
    
    # Map common variations
    if speaker_text in ['בן', 'איתמר', 'מנחים']:
        return f'[{speaker_text}]'
    
    # Check if it's already formatted
    if speaker_text.startswith('[') and speaker_text.endswith(']'):
        return speaker_text
    
    # For guest names, use the name
    return f'[{speaker_text}]'

def process_transcript(raw_text):
    """Main processing function to convert raw transcript to Q&A format"""
    
    # Clean production notes first
    text = clean_production_notes(raw_text)
    
    # Remove filler words
    text = remove_filler_words(text)
    
    # Split into lines for processing
    lines = text.split('\n')
    formatted_lines = []
    current_speaker = None
    current_block = []
    
    for line in lines:
        line = line.strip()
        
        # Skip empty lines temporarily
        if not line:
            if current_block:
                # End of a speech block
                formatted_lines.append(' '.join(current_block))
                formatted_lines.append('')  # Add blank line between blocks
                current_block = []
            continue
        
        # Check if this is a speaker line
        speaker_match = re.match(r'^(.+?):\s*(.*)$', line)
        
        if speaker_match and len(speaker_match.group(1)) < 30:
            # This is likely a speaker change
            if current_block:
                # Save previous block
                formatted_lines.append(' '.join(current_block))
                formatted_lines.append('')
                current_block = []
            
            speaker = speaker_match.group(1).strip()
            content = speaker_match.group(2).strip()
            
            # Format the speaker label
            formatted_speaker = format_speaker_label(speaker)
            
            if content:
                current_block = [f'{formatted_speaker}: {content}']
            else:
                current_speaker = formatted_speaker
        else:
            # Continue current speaker's text
            if current_block:
                current_block.append(line)
            else:
                # No speaker identified yet, keep the line
                formatted_lines.append(line)
    
    # Don't forget the last block
    if current_block:
        formatted_lines.append(' '.join(current_block))
    
    # Join and clean up
    result = '\n'.join(formatted_lines)
    
    # Clean up excessive blank lines (more than 2 in a row)
    result = re.sub(r'\n{3,}', '\n\n', result)
    
    return result.strip()

def process_episode_folder(folder_path):
    """Process a single episode folder"""
    transcript_path = folder_path / 'transcript.txt'
    
    if not transcript_path.exists():
        print(f"[WARN] No transcript.txt found in {folder_path.name}")
        return False
    
    try:
        # Read the raw transcript
        with open(transcript_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()
        
        # Process it
        formatted_content = process_transcript(raw_content)
        
        # Write it back
        with open(transcript_path, 'w', encoding='utf-8') as f:
            f.write(formatted_content)
        
        print(f"[SUCCESS] Processed: {folder_path.name}")
        return True
        
    except Exception as e:
        print(f"[ERROR] Error processing {folder_path.name}: {str(e)}")
        return False

def main():
    """Main execution function"""
    # Get the Episodes directory
    episodes_dir = Path(__file__).parent
    
    # Episodes to process (3-16)
    target_episodes = [
        'ep3- Salicrop',
        'ep04-carbon-rewind',
        'ep5-daikawood',
        'ep06-agritech-greeneye',
        'ep07-wildfires-firewave',
        'ep08-textile-recycling-textre',
        'ep9-satellite-astrea',
        'ep10-waste-to-energy-boson',
        'ep11-foodtech-brevel',
        'ep12-foodtech-oshi',
        'ep13-materials-polymertal',
        'ep14-blue-tech-econcrete',
        'ep15-foodtech-coffeesei',
        'ep16-coral-reefs-vcorals',
    ]
    
    print("=" * 60)
    print("Transcript Processor - Starting batch processing")
    print("=" * 60)
    
    successful = 0
    failed = 0
    
    for episode_name in target_episodes:
        episode_path = episodes_dir / episode_name
        
        if not episode_path.exists():
            print(f"[WARN] Folder not found: {episode_name}")
            failed += 1
            continue
        
        if process_episode_folder(episode_path):
            successful += 1
        else:
            failed += 1
    
    print("=" * 60)
    print(f"Processing complete!")
    print(f"[SUCCESS] Successful: {successful}")
    print(f"[ERROR] Failed: {failed}")
    print("=" * 60)

if __name__ == "__main__":
    main()
