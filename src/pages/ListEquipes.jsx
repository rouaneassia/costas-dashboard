import ListeEquipe from "../composantDashbord/Listequipe";


export default function ListEquipes({ equipe, onDelete }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <ListeEquipe equipe={equipe} onDelete={onDelete} />
    </div>
  );
}
