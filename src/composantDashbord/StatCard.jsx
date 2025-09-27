export default function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white p-4 rounded shadow flex items-start justify-between">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-green-600 text-sm">{change} from last month</p>
      </div>
      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
  );
}
