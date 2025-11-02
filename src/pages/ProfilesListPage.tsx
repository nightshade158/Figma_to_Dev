import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/ProfileCard';
import { UnlockModal } from '../components/UnlockModal';
import { getProfiles, getUnlockedProfiles, unlockProfile, /* resetUnlockedProfiles  */} from '../lib/api';
import { Profile } from '../types/profile';
import { ChevronDown } from 'lucide-react';

export function ProfilesListPage() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [unlockedProfileIds, setUnlockedProfileIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setIsLoading(true);
      const [profilesData, unlockedIds] = await Promise.all([
        getProfiles(),
        getUnlockedProfiles(),
      ]);
      setProfiles(profilesData);
      setUnlockedProfileIds(new Set(unlockedIds));
    } catch (err) {
      setError('Failed to load profiles');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

function handleUnlockClick(profileId: string, profileName: string) {
  if (unlockedProfileIds.has(profileId)) {
    navigate(`/profile/${profileId}`);
  } else {
    setSelectedProfile({ id: profileId, name: profileName });
    setIsModalOpen(true);
  }
}


  async function handleConfirmUnlock() {
    if (!selectedProfile) return;

    try {
      setIsUnlocking(true);
      await unlockProfile(selectedProfile.id);
      setUnlockedProfileIds(
        new Set([...unlockedProfileIds, selectedProfile.id])
      );
      setIsModalOpen(false);
      navigate(`/profile/${selectedProfile.id}`);
    } catch (err) {
      setError('Failed to unlock profile');
      console.error(err);
    } finally {
      setIsUnlocking(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white transition font-medium">
                Posted Gigs
              </button>
              <button className="text-gray-400 hover:text-white transition font-medium">
                Applicants
              </button>
            </div>
            <button className="text-gray-300 hover:text-white transition font-medium">
              Contact us
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-white">Product Designer</h1>
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
              • 59 Applicants
            </span>
            {/* <button
  onClick={async () => {
    try {
      await resetUnlockedProfiles();
      setUnlockedProfileIds(new Set());
      alert('Unlocked profiles reset!');
    } catch (err) {
      console.error(err);
      alert('Failed to reset');
    }
  }}
  className="mb-4 px-4 py-2 bg-red-600 text-white rounded"
>
  Reset Unlocked Profiles
</button> */} {/* Used for testing -- ignore */}

          </div>
          <p className="text-gray-400">
            0 - 1 Years of Experience • Zepto • New Delhi, India • Available Immediately
          </p>
        </div>

        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
          <div className="flex gap-3 text-sm">
            <button className="text-gray-400 hover:text-white transition">
              Experience Level
            </button>
            <button className="text-gray-400 hover:text-white transition">
              Availability
            </button>
            <button className="text-gray-400 hover:text-white transition">
              Preferred Location
            </button>
            <button className="text-gray-400 hover:text-white transition">
              Skills
            </button>
            <button className="text-gray-400 hover:text-white transition">
              Expected CTC
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition flex items-center gap-2">
            <span>Sort</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-800 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isUnlocked={unlockedProfileIds.has(profile.id)}
              onUnlock={handleUnlockClick}
            />
          ))}
        </div>
      </div>

      <UnlockModal
        isOpen={isModalOpen}
        profileName={selectedProfile?.name || ''}
        onConfirm={handleConfirmUnlock}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProfile(null);
        }}
        isLoading={isUnlocking}
      />
    </div>
  );
}
