import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";

export default function PublicationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const res = await axiosClient.get(`api/publications/${id}`);
                setPublication(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-600 mt-8">Chargement...</p>;
    }

    if (!publication) {
        return <p className="text-center text-red-500 mt-8">Publication introuvable.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                Détail de la Publication #{publication.id}
            </h2>
            <div className="grid grid-cols-1  gap-6 text-gray-700 text-sm">
                <div>
                    <p className="font-semibold">Titre (FR) : {publication.title_fr}</p>
                </div>
                <div>
                    <p className="font-semibold">Titre (EN) : {publication.title_en}</p>
                </div>
                <div dir="rtl" className="text-right">
                    <p className="font-semibold">العنوان (AR) : {publication.title_ar}</p>
                </div>
                <div>
                    <p className="font-semibold">Description (FR) :</p>
                    <p>{publication.description_fr}</p>
                </div>
                <div>
                    <p className="font-semibold">Description (EN) :</p>
                    <p>{publication.description_en}</p>
                </div>
                <div dir="rtl" className="text-right">
                    <p className="font-semibold">الوصف (AR) :</p>
                    <p>{publication.description_ar}</p>
                </div>
                <div>
                    <p className="font-semibold">Type de fichier : {publication.type}</p>
                </div>
                <div>
                    <p className="font-semibold">Fichier :
                        {publication.file_path ? (
                            <a
                                href={`${import.meta.env.VITE_BACKEND_URL}/storage/${publication.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Télécharger ou Voir le fichier
                            </a>
                        ) : (
                            <p>pas de fichier</p>
                        )}
                    </p>

                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                >
                    ⬅ Retour
                </button>
            </div>
        </div>
    );
}
