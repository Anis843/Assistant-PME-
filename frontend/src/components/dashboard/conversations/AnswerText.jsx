/**
 * AnswerText
 * Met en forme la réponse du LLM. Le modèle répond en texte simple, parfois
 * avec des puces, une énumération ou du **gras** : on le rend proprement
 * plutôt que d'afficher du markdown brut.
 *
 * Props:
 * - text: string  -> la réponse générée
 */

/**
 * Découpe le texte en blocs affichables (paragraphes et listes).
 * Les lignes consécutives d'un même paragraphe sont recollées : les LLM
 * retournent souvent du texte pré-coupé qu'on ne veut pas afficher en escalier.
 */
function parseBlocks(text) {
  const blocks = [];
  let list = null;
  let paragraph = null;

  function flush() {
    if (list) {
      blocks.push(list);
      list = null;
    }
    if (paragraph) {
      blocks.push(paragraph);
      paragraph = null;
    }
  }

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();

    // Ligne vide = fin du bloc courant.
    if (!line) {
      flush();
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);

    if (bullet || numbered) {
      if (paragraph) {
        blocks.push(paragraph);
        paragraph = null;
      }
      const ordered = Boolean(numbered);
      // Un changement de type (puces -> numéros) démarre une nouvelle liste.
      if (!list || list.ordered !== ordered) {
        if (list) blocks.push(list);
        list = { type: "list", ordered, items: [] };
      }
      list.items.push(bullet ? bullet[1] : numbered[1]);
      continue;
    }

    if (list) {
      blocks.push(list);
      list = null;
    }
    if (paragraph) paragraph.text += " " + line;
    else paragraph = { type: "paragraph", text: line };
  }

  flush();
  return blocks;
}

/** Rend les passages **en gras** (seul balisage inline produit par le LLM). */
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={index} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default function AnswerText({ text }) {
  const blocks = parseBlocks(text || "");

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`ml-4 space-y-1 ${
                block.ordered ? "list-decimal" : "list-disc"
              } marker:text-teal-300/70`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </ListTag>
          );
        }

        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
