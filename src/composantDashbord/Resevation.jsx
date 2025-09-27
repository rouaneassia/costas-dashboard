import { useEffect, useState } from "react";

export default function RendezVousList() {
  const [rendezVousList, setRendezVousList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/rendezvous", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => setRendezVousList(data))
      .catch((err) => console.error("Erreur de chargement:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 border-b pb-2">
        Liste des Rendez-vous
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm uppercase tracking-wider">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Avocat</th>
              <th className="py-3 px-4">Téléphone</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Heure</th>
              <th className="py-3 px-4">Sujet</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rendezVousList.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500 italic"
                >
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            ) : (
              rendezVousList.map((rdv, index) => (
                <tr
                  key={rdv.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4">{rdv.nom}</td>
                  <td className="py-3 px-4">{rdv.equipe?.name_fr}</td>
                  <td className="py-3 px-4">{rdv.telephone}</td>
                  <td className="py-3 px-4">{rdv.date}</td>
                  <td className="py-3 px-4">{rdv.heure}</td>
                  <td className="py-3 px-4">{rdv.sujet}</td>
                  <td className="py-3 px-4">{rdv.email}</td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {/* Gmail */}
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${rdv.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm shadow"
                      >
                         Gmail
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${rdv.telephone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm shadow"
                      >
                         WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
