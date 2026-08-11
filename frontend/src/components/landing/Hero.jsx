import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

/**
 * Hero
 * Section d'accroche en haut de la landing page.
 *
 * La promesse tenue ici doit correspondre exactement à ce que la démonstration
 * montre : un prospect qui perçoit un écart entre les deux cesse d'écouter.
 */
export default function Hero() {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <Badge variant="pill" color="teal" className="mb-8">
        Assistant documentaire IA
      </Badge>

      <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
        Posez vos questions{" "}
        <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
          à vos documents
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        NexIA indexe vos contrats, baux et factures, puis répond en français en
        citant le passage exact qui justifie sa réponse. Sans ouvrir un seul PDF.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link to="/Register">
          <Button variant="primary">Essayer la démo →</Button>
        </Link>
        <a href="#fonctionnalites">
          <Button variant="outline">Comment ça marche</Button>
        </a>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Démonstration ouverte — créez un compte et importez un PDF.
      </p>
    </section>
  );
}
