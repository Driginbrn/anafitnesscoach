/**
 * Zajedničke gradivne komponente sajta, korišćene na više ruta.
 * Sekcije i njihovi naslovi ostaju u samim rutama.
 */

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

type BtnProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline" | "terracotta";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
  const styles: Record<string, string> = {
    primary:
      "bg-brand-green text-primary-foreground shadow-soft hover:shadow-elegant hover:-translate-y-0.5",
    outline:
      "border border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 hover:border-brand-brown/40",
    /* Terakota je svetla — beo tekst na njoj pada na ~2.7:1, pa ide braon (~5:1). */
    terracotta:
      "bg-brand-terracotta text-brand-brown shadow-soft hover:shadow-elegant hover:-translate-y-0.5",
    ghost: "text-brand-brown hover:text-brand-green",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    /* Spoljni linkovi se otvaraju u novom tabu da posetilac ne izgubi stranicu. */
    const spoljni = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(spoljni ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
