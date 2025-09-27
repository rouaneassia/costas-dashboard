import { useState } from "react";
import PublicationForm from "./AjouterPublication";
import PublicationList from "./ListPublication";

export default function Publication() {
  const [publications, setPublications] = useState([]);
  const [langTab, setLangTab] = useState("ar"); // pour partage la langue aussi

  // Fonction pour ajouter une publication
  const addPublication = (newPub) => {
    setPublications([newPub, ...publications]);
  };

  // Fonction pour supprimer une publication
  const deletePublication = (id) => {
    setPublications(publications.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PublicationForm addPublication={addPublication} langTab={langTab} setLangTab={setLangTab} />
      <PublicationList publications={publications} deletePublication={deletePublication} langTab={langTab} />
    </div>
  );
}
