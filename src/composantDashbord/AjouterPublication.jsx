import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function PublicationForm() {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("image");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileRef = useRef(null);
  const urlRef = useRef();

  const titleArRef = useRef();
  const titleFrRef = useRef();
  const titleEnRef = useRef();

  const descArRef = useRef();
  const descFrRef = useRef();
  const descEnRef = useRef();

  const dateRef = useRef(); // ✅ Référence pour la date

  const handleFileChange = (e) => {
    fileRef.current = e.target.files[0];
  };

  const handleDrop = (e) => {
    e.preventDefault();
    fileRef.current = e.dataTransfer.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("type", selectedTab);
    formData.append("title_ar", titleArRef.current.value);
    formData.append("title_fr", titleFrRef.current.value);
    formData.append("title_en", titleEnRef.current.value);
    formData.append("description_ar", descArRef.current.value);
    formData.append("description_fr", descFrRef.current.value);
    formData.append("description_en", descEnRef.current.value);
    formData.append("date", dateRef.current.value); // ✅ Envoi de la date

    if (selectedTab === "video" && urlRef.current.value) {
      formData.append("video_url", urlRef.current.value);
    } else if (fileRef.current) {
      formData.append("file_path", fileRef.current);
    }

    try {
      await axiosClient.get("sanctum/csrf-cookie");
      await axiosClient.post("api/publications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      navigate("/liste-publications");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-10 p-6">
      <h2 className="text-2xl font-bold text-center mb-3 text-blue-800">
        Gestion des Publications
      </h2>

      {/* --- Choix type de publication --- */}
      <div className="flex justify-center mb-6">
        {["image", "video", "document"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              fileRef.current = null;
              if (urlRef.current) urlRef.current.value = "";
            }}
            className={`px-4 py-2 mx-1 rounded-t-md font-medium border ${
              selectedTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Publication
          </button>
        ))}
      </div>

      {/* --- Zone de drop ou URL vidéo --- */}
      {selectedTab === "video" ? (
        <div className="mb-6">
          <input
            type="url"
            placeholder="Entrez l'URL de la vidéo (YouTube, etc.)"
            ref={urlRef}
            className="w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm"
          />
          <p className="text-sm text-gray-500 mt-1">
            Ou laissez vide pour uploader une vidéo depuis votre appareil.
          </p>
        </div>
      ) : null}

      {(selectedTab !== "video" || (selectedTab === "video" && !urlRef.current?.value)) && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 mb-6"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {fileRef.current ? (
            <p className="text-green-600 font-semibold">📎 {fileRef.current.name}</p>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">
                {selectedTab === "image"
                  ? "PNG, JPG, GIF, WebP jusqu'à 10MB"
                  : selectedTab === "document"
                  ? "PDF, DOCX, PPTX jusqu'à 10MB"
                  : "MP4, AVI, MOV jusqu'à 50MB"}
              </p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept={
              selectedTab === "image"
                ? "image/*"
                : selectedTab === "document"
                ? ".pdf,.doc,.docx,.ppt,.pptx"
                : "video/*"
            }
            onChange={handleFileChange}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* --- Champ Date --- */}
        <input
          type="text"
          placeholder="📅 Entrez la date (YYYY-MM-DD)"
          ref={dateRef}
          className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm mb-2"
          required
        />

        {/* --- Titres --- */}
        <div>
          <input
            type="text"
            ref={titleArRef}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm mb-2"
            placeholder="ادخل عنوان المنشور بالعربية"
            required
          />
          <input
            type="text"
            ref={titleFrRef}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm mb-2"
            placeholder="Entrez le titre en français"
            required
          />
          <input
            type="text"
            ref={titleEnRef}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm"
            placeholder="Enter the title in English"
            required
          />
        </div>

        {/* --- Descriptions --- */}
        <div>
          <textarea
            ref={descArRef}
            rows={3}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm mb-2"
            placeholder="ادخل وصفاً بالعربية"
          ></textarea>
          <textarea
            ref={descFrRef}
            rows={3}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm mb-2"
            placeholder="Entrez une description en français"
          ></textarea>
          <textarea
            ref={descEnRef}
            rows={3}
            className="mt-1 block w-full border border-gray-400 rounded-md px-4 py-2 shadow-sm"
            placeholder="Enter a description in English"
          ></textarea>
        </div>

        {/* --- Bouton Publier --- */}
        <div className="mt-6 flex justify-center">
          {isSubmitting ? (
            <button
              type="submit"
              className="bg-blue-400 text-white px-6 py-2 rounded cursor-not-allowed flex items-center justify-center gap-2"
              disabled
            >
              <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Publier...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Publier
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
