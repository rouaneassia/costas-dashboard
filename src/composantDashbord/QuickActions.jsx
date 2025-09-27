import { Link } from "react-router-dom"; // ✅ CORRECT import

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Actions rapides</h4>
      <div className="space-y-3">
        <Link to="/ajouter-publication">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            + Nouvelle publication
          </button>
        </Link>
        
        <Link to="/liste-publications">
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100">
            Voir toutes les publications
          </button>
        </Link>
      </div>
    </div>
  );
}
