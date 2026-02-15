/**
 * Podcast Platform Icons
 * Collection of SVG icons for various podcast platforms
 */

interface IconProps {
  className?: string;
}

// Apple Podcasts Icon
export function ApplePodcastsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 2.61 1.527 4.857 3.727 5.891v-2.036c-1.364-.818-2.273-2.318-2.273-4.036 0-2.577 2.091-4.668 4.668-4.668s4.668 2.091 4.668 4.668c0 1.718-.909 3.218-2.273 4.036v2.036c2.2-1.034 3.727-3.281 3.727-5.891 0-3.614-2.931-6.545-6.545-6.545zm0 4.091c-1.364 0-2.455 1.091-2.455 2.454s1.091 2.455 2.455 2.455 2.455-1.092 2.455-2.455-1.091-2.454-2.455-2.454zm0 6.545c-.818 0-1.5.682-1.5 1.5v3.682c0 .818.682 1.5 1.5 1.5s1.5-.682 1.5-1.5v-3.682c0-.818-.682-1.5-1.5-1.5z"/>
    </svg>
  );
}

// YouTube Icon
export function YouTubeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// Snipd Icon (Teal circular brand logo)
export function SnipdIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00D4AA"/>
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Pocket Casts Icon
export function PocketCastsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 1.287.373 2.486 1.018 3.5l1.527-1.527c-.409-.636-.636-1.395-.636-2.2 0-2.245 1.827-4.072 4.073-4.072s4.072 1.827 4.072 4.072c0 .805-.227 1.564-.636 2.2l1.527 1.527c.645-1.014 1.018-2.213 1.018-3.5 0-3.614-2.931-6.545-6.545-6.545zm0 4.09c-1.364 0-2.454 1.091-2.454 2.455s1.09 2.455 2.454 2.455 2.455-1.091 2.455-2.455-1.091-2.454-2.455-2.454zm-1.09 6.546v4.636h2.18v-4.636h-2.18z"/>
    </svg>
  );
}

// Castbox Icon
export function CastboxIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 3c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 3c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/>
    </svg>
  );
}

// Google Podcasts Icon
export function GooglePodcastsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 10.5h3v3h-3v-3zM6 13.5h3v7.5H6v-7.5zM10.5 6h3v12h-3V6zM15 3h3v18h-3V3zM19.5 9h3v6h-3V9z"/>
    </svg>
  );
}

// YouTube Music Icon
export function YouTubeMusicIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-11.52c-2.436 0-4.416 1.98-4.416 4.416S9.564 16.416 12 16.416s4.416-1.98 4.416-4.416S14.436 7.584 12 7.584zm-1.248 6.048V10.368L13.248 12l-2.496 1.632z"/>
    </svg>
  );
}