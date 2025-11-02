import { X, Users } from 'lucide-react';

interface UnlockModalProps {
  isOpen: boolean;
  profileName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function UnlockModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: UnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-sm w-full mx-4">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <Users size={40} className="text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Are you sure you want to unlock this profile?
        </h2>

        <p className="text-gray-400 text-center text-sm mb-6">
          Unlocking will cost <span className="font-semibold text-white">10 credits</span>. Once confirmed, you'll be able to chat
          with this candidate directly.
        </p>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Credits Available</p>
          <p className="text-white text-2xl font-bold">200</p>
        </div>

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg mb-3 transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Unlocking...
            </>
          ) : (
            <>
              <span>🔓 Unlock</span>
              <span className="font-normal">10 Credits</span>
            </>
          )}
        </button>

        <button
          onClick={onCancel}
          disabled={isLoading}
          className="w-full border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 py-2 px-4 rounded-lg transition"
        >
          Cancel
        </button>

        <p className="text-gray-500 text-center text-xs mt-4">
          Most startups find it worth it - top talents go fast.
        </p>
      </div>
    </div>
  );
}
