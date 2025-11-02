import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfileById, isProfileUnlocked } from '../lib/api';
import { Profile } from '../types/profile';
import { ArrowLeft, Linkedin, Globe, FileText } from 'lucide-react';

export function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, [id]);

  async function loadProfile() {
    if (!id) return;

    try {
      setIsLoading(true);
      const [profileData, unlocked] = await Promise.all([
        getProfileById(id),
        isProfileUnlocked(id),
      ]);

      if (!profileData) {
        setError('Profile not found');
        return;
      }

      setProfile(profileData);
      setIsUnlocked(unlocked);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="text-red-400 mb-4">{error || 'Profile not found'}</div>
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Profiles
        </Link>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-4">Profile Locked</div>
          <p className="text-gray-400 mb-8">
            You need to unlock this profile to view full details.
          </p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Profiles
          </Link>
        </div>
      </div>
    );
  }

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white transition font-medium">
                Posted Gigs
              </button>
              <button className="text-gray-400 hover:text-white transition font-medium">
                Applicants
              </button>
              <button className="text-gray-400 hover:text-white transition font-medium">
                View Profile
              </button>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Candidate Status</p>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ● Under Review
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-800 pb-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <span className="text-gray-400">•</span>
                <span className="text-blue-400 font-semibold">{profile.title}</span>
                {profile.club_member && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Club Member
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">
                {profile.experience} • {profile.company} • {profile.location} • {profile.availability}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-2">Score</p>
              <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-green-500 text-2xl font-bold">{profile.score}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="mb-8 border-b border-gray-800 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">About me</h2>
              <p className="text-gray-400 leading-relaxed">{profile.about}</p>
            </div>

            <div className="mb-8 border-b border-gray-800 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 border-b border-gray-800 pb-8">
              <h2 className="text-xl font-bold text-white mb-4">College</h2>
              {profile.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-white font-semibold">{edu.degree}</p>
                  <p className="text-gray-400 text-sm">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.years}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Experience</h2>
              <div className="space-y-6">
                {profile.work_history.map((work, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{work.title}</p>
                      <p className="text-gray-400 text-sm">{work.company}</p>
                      <p className="text-gray-500 text-sm">{work.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Location</p>
                <p className="text-white font-semibold">{profile.location}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Website</p>
                {profile.website ? (
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                  >
                    <Globe size={16} />
                    {profile.website}
                  </a>
                ) : (
                  <p className="text-gray-500">Not provided</p>
                )}
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Resume</p>
                {profile.resume_url ? (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                  >
                    <FileText size={16} />
                    Resume
                  </a>
                ) : (
                  <p className="text-gray-500">Not provided</p>
                )}
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {profile.email}
                </a>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-3">Ideal next opportunity</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400">✓</span>
                  <span className="text-white">{profile.ideal_next_opportunity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">₹</span>
                  <span className="text-white font-semibold">{profile.lpa}</span>
                </div>
              </div>

              {Object.keys(profile.social_links).length > 0 && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <p className="text-gray-400 text-sm mb-3">Socials</p>
                  <div className="flex gap-3">
                    {profile.social_links.linkedin && (
                      <a
                        href={profile.social_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
