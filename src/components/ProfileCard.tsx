import { Profile } from '../types/profile';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  profile: Profile;
  isUnlocked: boolean;
  onUnlock: (profileId: string, profileName: string) => void;
}

export function ProfileCard({ profile, isUnlocked, onUnlock }: ProfileCardProps) {
  const navigate = useNavigate();
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold">{profile.name}</h3>
              {profile.club_member && (
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Club Member
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span>• {profile.title}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {profile.experience} • {profile.company} • {profile.location}
            </p>
            <p className="text-xs text-gray-500">
              {profile.created_at ? profile.created_at.split('T')[0] : ''} • {profile.availability}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center ml-4">
          <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
            <span className="text-green-500 text-xl font-bold">{profile.score}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {profile.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded border border-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="border-t border-gray-800 pt-4 mb-4 text-xs text-gray-400">
        <p className="mb-2">
          <span className="font-semibold text-gray-300">Ideal next opportunity</span>
        </p>
        <div className="flex gap-2 mb-3">
          <span className="bg-gray-800 text-blue-400 px-2 py-1 rounded">
            ✓ {profile.ideal_next_opportunity}
          </span>
          <span className="bg-gray-800 text-green-400 px-2 py-1 rounded">
            ₹ {profile.lpa}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 border border-gray-700 text-gray-300 py-2 px-4 rounded hover:bg-gray-800 transition">
          ✕ Reject
        </button>
         <button
          onClick={() =>
            isUnlocked ? navigate(`/profile/${profile.id}`) : onUnlock(profile.id, profile.name)
          }
          className={`flex-1 py-2 px-4 rounded font-semibold flex items-center justify-center gap-2 transition ${
            isUnlocked
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Zap size={16} />
          {isUnlocked ? 'View Profile' : 'Unlock Profile'}
          {!isUnlocked && <span className="ml-1">💎 100</span>}
        </button>
      </div>
    </div>
  );
}
