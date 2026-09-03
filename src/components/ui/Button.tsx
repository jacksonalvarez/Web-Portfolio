import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  external?: boolean;
};

const variants = {
  primary:
    "bg-accent text-background hover:bg-accent-dim border border-accent",
  secondary:
    "bg-surface-raised text-foreground hover:bg-border border border-border",
  ghost: "text-muted hover:text-foreground hover:bg-surface-raised",
};

export function Button({
  href,
  variant = "primary",
  children,
  external,
}: ButtonProps) {
  const className = `inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${variants[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
