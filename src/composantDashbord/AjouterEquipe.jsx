import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function AjouterEquipe() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name_ar: "",
    name_fr: "",
    date: "",
    email: "",
    bio_ar: "",
    bio_fr: "",
    bio_en: "",
    linkedin: "",
    facebook: "",
    instagram: "",
  });

  const imageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    imageRef.current = e.target.files[0];
  };

  const handleDrop = (e) => {
    e.preventDefault();
    imageRef.current = e.dataTransfer.files[0];
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name_ar.trim()) newErrors.name_ar = ["Le nom arabe est requis."];
    if (!form.name_fr.trim()) newErrors.name_fr = ["Le nom français est requis."];
    if (!form.date.trim()) newErrors.date = ["La date est requise."];
    if (!form.email.trim()) newErrors.email = ["L'email est requis."];
    if (!imageRef.current) newErrors.image = ["L'image est requise."];
    if (!form.bio_ar.trim()) newErrors.bio_ar = ["La bio arabe est requise."];
    if (!form.bio_fr.trim()) newErrors.bio_fr = ["La bio française est requise."];
    if (!form.bio_en.trim()) newErrors.bio_en = ["La bio anglaise est requise."];
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("image", imageRef.current);

    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/api/equipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/liste-equipe");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur :", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-10 p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Ajouter un membre</h2>

      {/* Drag & Drop Image */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 mb-6"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {imageRef.current ? (
          <p className="text-green-600 font-semibold">📎 {imageRef.current.name}</p>
        ) : (
          <>
            <p className="text-gray-500 mb-2">Cliquez ou glissez une image</p>
            <p className="text-sm text-gray-400">Formats acceptés : JPG, PNG, WebP</p>
          </>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image[0]}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name_ar"
          placeholder="الاسم الكامل"
          value={form.name_ar}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
        />
        {errors.name_ar && <p className="text-sm text-red-600">{errors.name_ar[0]}</p>}

        <input
          name="name_fr"
          placeholder="Nom complet"
          value={form.name_fr}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
        />
        {errors.name_fr && <p className="text-sm text-red-600">{errors.name_fr[0]}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
            />
            {errors.date && <p className="text-sm text-red-600">{errors.date[0]}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email[0]}</p>}
          </div>
        </div>

        <textarea
          name="bio_ar"
          placeholder="المسار المهني (Ar)"
          value={form.bio_ar}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
        />
        {errors.bio_ar && <p className="text-sm text-red-600">{errors.bio_ar[0]}</p>}

        <textarea
          name="bio_fr"
          placeholder="Parcours (Fr)"
          value={form.bio_fr}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
        />
        {errors.bio_fr && <p className="text-sm text-red-600">{errors.bio_fr[0]}</p>}

        <textarea
          name="bio_en"
          placeholder="Career Path (En)"
          value={form.bio_en}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
        />
        {errors.bio_en && <p className="text-sm text-red-600">{errors.bio_en[0]}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="linkedin"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
          <input
            name="facebook"
            placeholder="Facebook"
            value={form.facebook}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
          <input
            name="instagram"
            placeholder="Instagram"
            value={form.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
        </div>

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
