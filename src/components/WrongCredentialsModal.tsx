interface WrongCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WrongCredentialsModal({
  isOpen,
  onClose,
}: WrongCredentialsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
            !
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Login Failed</h2>
          <p className="text-gray-600">
            {/* Username or password is incorrect. Please try again. */}
            მომხმარებლის სახელი ან პაროლი არასწორია. გთხოვთ სცადოთ თავიდან.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
