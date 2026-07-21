import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const NAV_LINKS = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#integrations", label: "Intégrations" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#docs", label: "Docs" },
];

/**
 * Navbar
 * Barre de navigation fixe en haut de la landing page.
 * Les liens de nav sont des ancres (#section) vers les sections de la même page.
 * "Connexion" est un vrai lien vers /login.
 *
 * Props:
 * - onCtaClick: callback optionnel pour "Démarrer gratuit"
 *   (sinon, c'est un simple bouton sans action)
 */
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-slate-800/60 px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-400 to-violet-500" />
        <span className="text-lg font-bold text-white">NexIA</span>
        <Badge variant="label" color="teal">
          BETA
        </Badge>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-slate-300 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link to="/login" className="text-sm text-slate-300 hover:text-white">
          Connexion
        </Link>
        <Link to="/Register">
          <Button
            variant="primary"
            className="px-5 py-2 text-sm hover:cursor-pointer"
          >
            Démarrer gratuit
          </Button>
        </Link>
      </div>
    </nav>
  );
}
