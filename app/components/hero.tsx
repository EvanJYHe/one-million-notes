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
            <path d="m14 7 23 18M9 27l27 8M7 47h28" />
          </svg>
          <h1>One Million Notes</h1>
          <svg
            className="title-accent title-accent-right"
            viewBox="0 0 46 64"
            aria-hidden="true"
          >
            <path d="m5 21 8-14m4 20 13-4" />
            <circle cx="23" cy="42" r="3.25" />
          </svg>
        </div>
        <p>
          A collaborative message wall for the world.
          <br />
          Share a thought, spread some joy, leave your note.
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
