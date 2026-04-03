import Link from "next/link";
import SpotifyIcon from "./SpotifyIcon";

export default function SocialLinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white">חברו אלינו</h2>
        <p className="body-text text-base md:text-lg text-white/70 mt-3">
          עקבו, שתפו, ותחזרו לפודקאסט כשבא לכם עוד.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="https://www.linkedin.com/company/%D7%90%D7%99%D7%9A-%D7%A4%D7%95%D7%AA%D7%A8%D7%99%D7%9D-%D7%90%D7%AA-%D7%96%D7%94"
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover inline-flex items-center gap-4 justify-center md:justify-start"
        >
          <svg className="w-6 h-6 text-white/90" fill="#0A66C2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zM8 19H5v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="font-bold">LinkedIn</span>
        </Link>

        <Link
          href="https://www.facebook.com/profile.php?id=61560006065019"
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover inline-flex items-center gap-4 justify-center md:justify-start"
        >
          <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="font-bold">Facebook</span>
        </Link>

        <Link
          href="https://open.spotify.com/show/1ddFDGd1vH4UWIlfGjhS2Y"
          target="_blank"
          rel="noopener noreferrer"
          className="glass p-5 rounded-sm glass-hover inline-flex items-center gap-4 justify-center md:justify-start"
        >
          <SpotifyIcon className="w-6 h-6" />
          <span className="font-bold">ספוטיפיי</span>
        </Link>
      </div>
    </section>
  );
}

