import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const data = [
  { name: 'Mon', uploads: 40 },
  { name: 'Tue', uploads: 30 },
  { name: 'Wed', uploads: 55 },
  { name: 'Thu', uploads: 80 },
  { name: 'Fri', uploads: 65 },
  { name: 'Sat', uploads: 90 },
  { name: 'Sun', uploads: 45 },
];

const FLAGGED_ITEMS = [
  { id: 1, title: 'Untitled Project 2', reason: 'Copyright Music', reporter: 'user_99' },
  { id: 2, title: 'Sketchy Template', reason: 'Inappropriate Content', reporter: 'user_12' },
];

export const Admin: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center">Access Denied</div>;
  }

  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Moderation Dashboard</h1>

      {/* Stats */}
      <div className="bg-card p-4 rounded-xl mb-8 border border-slate-800">
        <h3 className="font-bold text-sm mb-4 text-slate-400">Weekly Uploads</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="uploads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flagged Content Queue */}
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <AlertTriangle className="text-red-500" size={20} /> Flagged Content
      </h3>
      
      <div className="space-y-3">
        {FLAGGED_ITEMS.map(item => (
          <div key={item.id} className="bg-card p-4 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm">{item.title}</h4>
              <p className="text-xs text-red-400">Reason: {item.reason}</p>
              <p className="text-[10px] text-slate-500">Reported by: {item.reporter}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                <Trash2 size={16} />
              </button>
              <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20">
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};