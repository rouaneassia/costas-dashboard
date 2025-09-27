import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { FaPen, FaTrash, FaEye } from "react-icons/fa";

export default function PublicationList() {
  const [publications, setPublications] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublications = async () => {
      const res = await axiosClient.get("api/publications");
      console.log("📦 DATA:", res.data);
      setPublications(res.data);
    };
    fetchPublications();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Tu peux supprimer cette publication")) {
      await axiosClient.get("sanctum/csrf-cookie");
      const res = await axiosClient.delete(`api/publications/${id}`);
      if (res.status === 200) {
        setPublications((prev) => prev.filter((e) => e.id !== id));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/modifier-publication/${id}`);
  };

  const handleView = (id) => {
    navigate(`/publication/${id}`);
  };

  const truncateText = (text, wordLimit = 4) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };

  const filteredPublications = publications.filter((pub) => {
    const searchLower = search.toLowerCase();
    return (
      pub.title_ar?.toLowerCase().includes(searchLower) ||
      pub.title_fr?.toLowerCase().includes(searchLower) ||
      pub.title_en?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-7xl mx-auto mb-10 p-6">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Liste des Publications
      </h2>

      {/* Barre de recherche */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="🔍 Rechercher un titre (ar/fr/en)..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {currentItems.length === 0 ? (
        <p className="text-center text-gray-600">Aucune publication trouvée.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
            <table className="min-w-full table-fixed border border-gray-300 text-sm text-left">
              <thead className="bg-blue-50 text-blue-800 uppercase font-semibold">
                <tr>
                  <th className="w-36 px-4 py-3 border border-gray-300">Titre (FR)</th>
                  <th className="w-36 px-4 py-3 border border-gray-300">Titre (EN)</th>
                  <th className="w-36 px-4 py-3 border border-gray-300 text-right" dir="rtl">Titre (AR)</th>
                  <th className="w-48 px-4 py-3 border border-gray-300">Description (FR)</th>
                  <th className="w-48 px-4 py-3 border border-gray-300">Description (EN)</th>
                  <th className="w-48 px-4 py-3 border border-gray-300 text-right" dir="rtl">Description (AR)</th>
                  <th className="w-28 px-4 py-3 border border-gray-300">Fichier</th>
                  <th className="w-28 px-4 py-3 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border border-gray-200 text-blue-700">{truncateText(pub.title_fr)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-blue-700">{truncateText(pub.title_en)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-blue-700 text-right" dir="rtl">{truncateText(pub.title_ar)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600">{truncateText(pub.description_fr)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600">{truncateText(pub.description_en)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600 text-right" dir="rtl">{truncateText(pub.description_ar)}</td>
                    <td className="px-4 py-3 border border-gray-200 text-green-600">
                      {pub.type === "video" && pub.video_url ? (
                        <a
                          href={pub.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 text-red-600"
                        >
                          🎥 YouTube
                        </a>
                      ) : pub.file_path ? (
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/storage/${pub.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1 text-blue-600"
                        >
                          Voir {pub.type}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="border border-gray-200 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(pub.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(pub.id)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded text-xs"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination simple */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
