/**
 * Button
 * Bouton réutilisable pour toute l'app (Navbar, Hero, etc.)
 *
 * Props:
 * - variant: 'primary' | 'outline'   -> style visuel
 * - icon: composant lucide-react (optionnel), rendu avant le children
 * - as: 'button' | 'a'               -> permet de le rendre en lien si besoin
 * - className: classes tailwind additionnelles
 * - ...rest: props natives transmises (onClick, href, type, etc.)
 */
export default function Button({
  variant = "primary",
  icon: Icon,
  as = "button",
  className = "",
  children,
  ...rest
}) {
  const Component = as;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 " +
    "text-sm font-semibold transition-colors duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const variants = {
    primary:
      "bg-teal-400 text-slate-950 hover:bg-teal-300 active:bg-teal-500",
    outline:
      "border border-slate-600 text-white hover:border-slate-400 hover:bg-white/5",
  };

  return (
    <Component className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </Component>
  );
}
