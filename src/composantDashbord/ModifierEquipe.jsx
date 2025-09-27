import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function ModifierEquipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageRef = useRef(null);

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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // prévisualisation

  useEffect(() => {
    axiosClient.get(`/api/equipes/${id}`).then((res) => {
      setForm(res.data);
      setCurrentImage(res.data.image);
      imageRef.current = null;
      setPreviewImage(null);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      imageRef.current = file;
      setPreviewImage(URL.createObjectURL(file)); // pour prévisualisation
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      imageRef.current = file;
      setPreviewImage(URL.createObjectURL(file)); // pour prévisualisation
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageRef.current instanceof File) {
      formData.append("image", imageRef.current);
    }

    formData.append("_method", "PUT");

    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post(`/api/equipes/${id}`, formData, {
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
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Modifier le membre</h2>

      {/* Drag & Drop Image */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 mb-6"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Prévisualisation"
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
        ) : currentImage ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/storage/${currentImage}`}
            alt="Aperçu"
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
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
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
        </div>
        {errors.date && <p className="text-sm text-red-600">{errors.date[0]}</p>}
        {errors.email && <p className="text-sm text-red-600">{errors.email[0]}</p>}

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
            value={form.linkedin || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
          <input
            name="facebook"
            placeholder="Facebook"
            value={form.facebook || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
          <input
            name="instagram"
            placeholder="Instagram"
            value={form.instagram || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm"
          />
        </div>

        <div className="mt-6 flex justify-center">
          {isSubmitting ? (
            <button
              type="submit"
              className="bg-blue-400 text-white px-6 py-2 rounded cursor-not-allowed flex items-center gap-2"
              disabled
            >
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Modification...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Enregistrer les modifications
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
