import { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { FaFacebook, FaInstagram, FaLinkedin, FaTrash, FaPen, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ListeEquipe({ onEdit }) {
  const [equipes, setEquipes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    axiosClient.get("api/equipes").then((res) => setEquipes(res.data));
  }, []);

  const filtered = equipes.filter((e) =>
    [e.name_ar, e.name_fr].some((n) => n?.toLowerCase().includes(search.toLowerCase()))
  );

  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

const handleDelete = async (id) => {
  if (confirm("🗑 Voulez-vous vraiment supprimer ce membre définitivement ?")) {
    try {
      await axiosClient.delete(`/api/equipes/${id}`);
      setEquipes((list) => list.filter((e) => e.id !== id)); // Mettre à jour la liste dans l'interface
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response?.data || error.message);
      alert("Impossible de supprimer le membre. Vérifiez le serveur.");
    }
  }
};



  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">Liste des membres</h2>

      <input
        type="text"
        placeholder="🔍 Rechercher..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 border px-3 py-2 rounded-md shadow-sm w-full max-w-sm focus:outline-none"
      />

      {displayed.length === 0 ? (
        <p className="text-center text-gray-500">Aucun membre trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-2 border">Photo</th>
                <th className="p-2 border">Nom AR</th>
                <th className="p-2 border">Nom FR</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Parcours AR</th>
                <th className="p-2 border">Parcours FR</th>
                <th className="p-2 border">Parcours EN</th>
                <th className="p-2 border text-center">Réseaux</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    {m.image ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/storage/${m.image}`}
                        alt="img"
                        className="w-10 h-10 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-2 border">{m.name_ar || "-"}</td>
                  <td className="p-2 border">{m.name_fr || "-"}</td>
                  <td className="p-2 border">{m.date || "-"}</td>
                  <td className="p-2 border">{m.email || "-"}</td>

                  {/* ✅ parcours affiché en texte fixe pour l'organisation */}
                  <td className="p-2 border text-gray-600">Diplôme en Droit ...</td>
                  <td className="p-2 border text-gray-600">Diplôme en Droit ...</td>
                  <td className="p-2 border text-gray-600">Diplôme en Droit ...</td>

                  <td className="p-8 border text-center text-lg text-blue-600 flex gap-2 justify-center">
                    {m.facebook && (
                      <a href={m.facebook} target="_blank" rel="noreferrer">
                        <FaFacebook />
                      </a>
                    )}
                    {m.instagram && (
                      <a href={m.instagram} target="_blank" rel="noreferrer">
                        <FaInstagram />
                      </a>
                    )}
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                  </td>
                  <td className="p-2 border text-center">
                    <div className="flex justify-center gap-2">
                      {/* 👁 Détail */}
                      <button
                        onClick={() => navigate(`/equipe/detail/${m.id}`)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                      >
                        <FaEye />
                      </button>

                      {/* ✏️ Modifier */}
                      <button
                        onClick={() => navigate(`/equipe/${m.id}`)}
                        className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                      >
                        <FaPen />
                      </button>

                      {/* 🗑 Supprimer */}
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
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
      )
      }

      {
        Math.ceil(filtered.length / itemsPerPage) > 1 && (
          <div className="flex justify-end mt-4 gap-2">
            {[...Array(Math.ceil(filtered.length / itemsPerPage))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${i + 1 === page
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-blue-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )
      }
    </div >
  );
}
