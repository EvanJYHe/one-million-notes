const socialLinks = [
  {
    href: "https://www.evanhe.co/",
    label: "Portfolio",
    icon: "portfolio",
    featured: true,
  },
  {
    href: "https://github.com/EvanJYHe",
    label: "GitHub",
    icon: "github",
    featured: false,
  },
  {
    href: "https://www.linkedin.com/in/evan-he-4253712a9/",
    label: "LinkedIn",
    icon: "linkedin",
    featured: false,
  },
  {
    href: "https://x.com/EvanJYHe",
    label: "Twitter",
    icon: "x",
    featured: false,
  },
  {
    href: "mailto:e35h@uwaterloo.ca",
    label: "Email",
    icon: "email",
    featured: false,
  },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "github") {
    return (
      <svg className="footer-link-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.91c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.97c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.56 5.06.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg className="footer-link-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 7.7A2.2 2.2 0 1 0 5.2 3.3a2.2 2.2 0 0 0 0 4.4ZM3.35 20.7h3.7V9.5h-3.7v11.2Zm5.92 0h3.69v-6.24c0-1.65.31-3.24 2.35-3.24 2.01 0 2.04 1.88 2.04 3.35v6.13h3.7v-6.91c0-3.4-.73-6.02-4.71-6.02-1.91 0-3.19 1.05-3.71 2.04h-.05V9.5H9.27v11.2Z"
        />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg className="footer-link-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.36l7.25-8.29L2.97 3h6.4l4.42 5.84L18.9 3Zm-1.1 16.19h1.73L8.43 4.72H6.58L17.8 19.19Z"
        />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg className="footer-link-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 6.5h16v11H4z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m4.5 7 7.5 6 7.5-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg className="footer-link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3.5 8.5h17M7 6.5h.01M10 6.5h.01"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-signature">
        <p>
          Made with <span aria-label="love">♥</span> by{" "}
          <a
            href="https://www.evanhe.co/"
            target="_blank"
            rel="noreferrer"
        >
            Evan He
          </a>
        </p>
      </div>

      <nav className="footer-links" aria-label="Evan He links">
        {socialLinks.map(({ featured, href, icon, label }) => {
          const isEmail = href.startsWith("mailto:");

          return (
            <a
              className={featured ? "footer-link featured" : "footer-link"}
              href={href}
              key={label}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noreferrer"}
            >
              <SocialIcon name={icon} />
              {label}
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
