export default function NavItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
      {icon}
      <span>{label}</span>
    </div>
  );
}
