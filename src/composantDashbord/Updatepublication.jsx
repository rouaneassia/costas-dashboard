import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function ModifierPublication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("image");
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // Champs multilingues
  const [titleAr, setTitleAr] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descEn, setDescEn] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(`/api/publications/${id}`);
        const data = res.data;

        setInitialData(data);
        setSelectedTab(data.type);
        setTitleAr(data.title_ar || "");
        setTitleFr(data.title_fr || "");
        setTitleEn(data.title_en || "");
        setDescAr(data.description_ar || "");
        setDescFr(data.description_fr || "");
        setDescEn(data.description_en || "");
        setVideoUrl(data.video_url || "");
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedTab === "youtube" && !videoUrl) {
      alert("Veuillez entrer un lien YouTube.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("type", selectedTab);
    formData.append("title_ar", titleAr);
    formData.append("title_fr", titleFr);
    formData.append("title_en", titleEn);
    formData.append("description_ar", descAr);
    formData.append("description_fr", descFr);
    formData.append("description_en", descEn);

    if (selectedTab !== "youtube" && file) {
      formData.append("file_path", file);
    }

    if (selectedTab === "youtube" && videoUrl) {
      formData.append("video_url", videoUrl);
    }

    try {
      await axiosClient.post(`/api/publications/${id}`, formData);
      navigate("/liste-publications");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

  if (!initialData)
    return <div className="p-4 text-center text-gray-500">Chargement des données...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Modifier Publication</h2>

      {/* Onglets types */}
      <div className="flex space-x-2 mb-4">
        {["image", "video", "document", "youtube"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedTab(type)}
            className={`px-4 py-2 rounded-md border ${
              selectedTab === type
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titres */}
        <input
          type="text"
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="العنوان بالعربية"
          required
        />
        <input
          type="text"
          value={titleFr}
          onChange={(e) => setTitleFr(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Titre en français"
          required
        />
        <input
          type="text"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Title in English"
          required
        />

        {/* Descriptions */}
        <textarea
          value={descAr}
          onChange={(e) => setDescAr(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="الوصف بالعربية"
        />
        <textarea
          value={descFr}
          onChange={(e) => setDescFr(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Description en français"
        />
        <textarea
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Description in English"
        />

        {/* YouTube URL */}
        {selectedTab === "youtube" && (
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Lien de la vidéo YouTube"
            required
          />
        )}

        {/* Fichier (image / vidéo / document) */}
        {selectedTab !== "youtube" && (
          <div>
            <label className="block mb-2 font-medium">
              Changer le fichier (optionnel) :
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept={
                selectedTab === "image"
                  ? "image/*"
                  : selectedTab === "video"
                  ? "video/*"
                  : selectedTab === "document"
                  ? ".pdf,.doc,.docx,.ppt,.pptx"
                  : "*"
              }
            />
            {file && (
              <p className="text-sm text-gray-500 mt-1">
                Fichier sélectionné : <strong>{file.name}</strong>
              </p>
            )}

            {/* Affichage du fichier actuel */}
            {initialData.file_path && (
              <div className="mt-4 text-sm text-gray-700">
                <p className="font-medium mb-1">Fichier actuel :</p>
               
                {selectedTab === "document" && (
                  <a
                    href={initialData.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Voir le document
                  </a>
                )}
                {selectedTab === "video" && (
                  <video
                    controls
                    src={initialData.file_path}
                    className="mt-2 w-full max-h-64 rounded border"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Bouton soumettre */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Mise à jour en cours..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
}
