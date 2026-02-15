"use client";

export default function ScrollToEpisodesButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href="#episodes"
      className="btn-glass"
      onClick={handleClick}
    >
      לפרקים
    </a>
  );
}
