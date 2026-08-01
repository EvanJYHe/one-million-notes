import Image from "next/image";

type HeroProps = {
  noteCount: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export function Hero({ noteCount }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-art" aria-hidden="true">
        <Image
          src="/art/hero-note-stack-v4.webp"
          alt=""
          width={260}
          height={195}
          priority
        />
      </div>

      <div className="hero-copy">
        <div className="hero-title">
          <svg
            className="title-accent title-accent-left"
            viewBox="0 0 46 64"
            aria-hidden="true"
          >
            <path d="m24 13 13 10M20 29l12 3M19 43h9" />
          </svg>
          <h1>One Million Notes</h1>
          <svg
            className="title-accent title-accent-right"
            viewBox="0 0 46 64"
            aria-hidden="true"
          >
            <path d="m5 20 7-11m5 20 10-3" />
            <circle cx="22" cy="40" r="4" />
          </svg>
        </div>
        <p>
          A public wall for passing thoughts.
          <br />
          Leave a note. Read what others left behind.
        </p>
        <Image
          className="title-doodle title-doodle-hearts"
          src="/art/doodle-hearts-v2.webp"
          alt=""
          width={54}
          height={79}
          aria-hidden="true"
        />
      </div>

      <aside className="note-count-card" aria-label="Note collection progress">
        <strong>{numberFormatter.format(noteCount)}</strong>
        <span>notes so far</span>
        <p>
          <span aria-hidden="true">♥</span>
          Help us reach one million!
        </p>
      </aside>
    </section>
  );
}
