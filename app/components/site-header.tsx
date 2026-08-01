import Image from "next/image";

type SiteHeaderProps = {
  onAddNote: () => void;
};

export function SiteHeader({ onAddNote }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand-lockup" href="#home" aria-label="One Million Notes home">
          <picture className="brand-mark">
            <source
              media="(max-width: 620px)"
              srcSet="/art/hero-note-stack-v4.webp"
            />
            <Image
              src="/art/brand-note-icon-v4.webp"
              alt=""
              width={58}
              height={58}
              priority
            />
          </picture>
          <span>One Million Notes</span>
        </a>

        <button
          className="add-note-button"
          type="button"
          onClick={onAddNote}
          aria-label="Add Note"
          title="Add Note"
        >
          <PencilIcon />
          <span>Add Note</span>
        </button>
      </div>
    </header>
  );
}

function PencilIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
    >
      <path
        d="m14.5 5.5 4 4M4 20l3.7-.8L19 7.9a2.12 2.12 0 0 0-3-3L4.8 16.2 4 20Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
