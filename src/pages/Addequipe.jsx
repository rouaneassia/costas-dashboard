import AjouterEquipe from "../composantDashbord/AjouterEquipe";


export default function Addequipe({ onAdd }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <AjouterEquipe onAdd={onAdd} />
    </div>
  );
}
