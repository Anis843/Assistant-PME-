import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import { register, login } from "../lib/api";
import { saveToken } from "../lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ email, password, fullName, companyName });

      // Le backend ne renvoie pas de token à l'inscription (juste le user créé),
      // donc on enchaîne avec un login pour connecter directement l'utilisateur.
      const { access_token } = await login({ email, password });
      saveToken(access_token);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Impossible de créer le compte.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Déployez votre premier agent IA en quelques minutes."
      footer={
        <>
          Déjà un compte ?{" "}
          <Link
            to="/Login"
            className="font-semibold text-teal-400 hover:text-teal-300"
          >
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Nom complet
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Votre nom"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Entreprise
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nom de votre PME"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@entreprise.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 caractères minimum"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création..." : "Créer mon compte"}
        </Button>
      </form>
    </AuthLayout>
  );
}
