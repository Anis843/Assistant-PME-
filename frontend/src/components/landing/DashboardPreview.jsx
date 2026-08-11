import BrowserMockup from "../ui/BrowserMockup";

/**
 * DashboardPreview
 * Aperçu du produit sur la landing page.
 *
 * Une vraie capture plutôt qu'une maquette : les chiffres inventés d'une
 * maquette (« 342 tâches automatisées ») se remarquent, et un visiteur qui
 * doute d'un écran doute ensuite de tout le reste de la page.
 */
export default function DashboardPreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <BrowserMockup url="assistant-pme-teal.vercel.app/app/Chat">
          <img
            src="/og-image.png"
            alt="Interface de NexIA : une question posée en français, la réponse générée, et le document source cité en dessous."
            className="block w-full"
          />
        </BrowserMockup>
      </div>
    </section>
  );
}
