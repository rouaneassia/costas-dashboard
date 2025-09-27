import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function EquipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [membre, setMembre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembre = async () => {
      try {
        const res = await axiosClient.get(`api/equipes/${id}`);
        setMembre(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement du membre :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembre();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;
  }

  if (!membre) {
    return <p className="text-center text-red-500 mt-8">Membre introuvable.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Détails du Membre
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div>
          {membre.image ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/storage/${membre.image}`}
              alt="Membre"
              className="w-36 h-36 rounded-full object-cover shadow-lg border"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
              ?
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <p className="font-semibold mb-1">Nom (FR):</p>
            <p>{membre.name_fr}</p>
          </div>
          <div className="text-right" dir="rtl">
            <p className="font-semibold mb-1">الاسم (AR):</p>
            <p>{membre.name_ar}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Email :</p>
            <p>{membre.email}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Date :</p>
            <p>{membre.date}</p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
        <div>
          <p className="font-semibold mb-2">Parcours (FR)</p>
          <div className="p-3 bg-gray-50 rounded-lg border">{membre.bio_fr || "-"}</div>
        </div>
        <div>
          <p className="font-semibold mb-2 text-right" dir="rtl">المسار (AR)</p>
          <div dir="rtl" className="p-3 bg-gray-50 rounded-lg border text-right">{membre.bio_ar || "-"}</div>
        </div>
        <div>
          <p className="font-semibold mb-2">Parcours (EN)</p>
          <div className="p-3 bg-gray-50 rounded-lg border">{membre.bio_en || "-"}</div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold text-gray-700 mb-4 text-lg">Réseaux Sociaux</p>
        <div className="flex justify-center gap-6 text-2xl">
          {membre.facebook && (
            <a href={membre.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition">
              <FaFacebook />
            </a>
          )}
          {membre.instagram && (
            <a href={membre.instagram} target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-600 transition">
              <FaInstagram />
            </a>
          )}
          {membre.linkedin && (
            <a href={membre.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900 transition">
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          ⬅ Retour
        </button>
      </div>
    </div>
  );
}
