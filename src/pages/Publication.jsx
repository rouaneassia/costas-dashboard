
import StatCard from '../composantDashbord/StatCard';

import QuickActions from '../composantDashbord/QuickActions';
import { Eye, Users, TrendingUp } from 'lucide-react';

export default function Publication() {
  return (
    <div className="flex min-h-screen bg-gray-100">
     

      <main className="flex-1 p-8">
        <header>
          <h2 className="text-2xl font-semibold">Tableau de bord</h2>
          <p className="text-gray-500 text-sm mt-1">
            Vue d’ensemble des publications et performances.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <StatCard title="Publications" value="324" change="+12%" />
          <StatCard title="Vues totales" value="45.2K" change="+8.2%" icon={<Eye size={20} />} />
          <StatCard title="Lecteurs actifs" value="2.4K" change="+15%" icon={<Users size={20} />} />
          <StatCard title="Taux d'engagement" value="68%" change="+5%" icon={<TrendingUp size={20} />} />
        </div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <QuickActions />
        </section>
      </main>
    </div>
  );
}
