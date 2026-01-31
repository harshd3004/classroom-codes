function InviteModal({ onClose }) {
const inviteMessage = `You're invited to join the "${className}" class.

👉 Join instantly using this link:
http://localhost:5173/classroom/${classroomId}

Or, visit the ClassroomCodes website and enter the following join code:
${joinCode}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">
        
        <h2 className="text-2xl font-semibold text-gray-900">
          Invite Participants
        </h2>

        {/* Join Code */}
        <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Join Code</p>
            <p className="text-lg font-mono font-semibold">{joinCode}</p>
          </div>
          <button
            onClick={() => copyToClipboard(joinCode)}
            className="ml-3 px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Copy
          </button>
        </div>

        {/* Expiry */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Expires:</span>{" "}
          {new Date(expiresAt).toLocaleString()}
        </p>

        {/* Copy Invite Message */}
        <button
          onClick={() => copyToClipboard(inviteMessage)}
          className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Copy Invite Message
        </button>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
