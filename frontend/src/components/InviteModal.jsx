import { useClassroom } from "../contexts/Classroom";

function InviteModal({ onClose }) {

  const { classroomId, classroomData } = useClassroom()
  const { classroomName, joinCode, expiresAt } = classroomData

  const formatExpiry = (expiresAt) => {
    const date = new Date(expiresAt);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";
    const hour12 = hours % 12 || 12;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${hour12}:${minutes} ${ampm} ${day}/${month}/${year}`;
  };

const inviteMessage = `You're invited to join the "${classroomName}" class.

👉 Join instantly using this link:
http://localhost:5173/classroom/${classroomId}

Or, visit the ClassroomCodes website and enter the following join code:
${joinCode}`;

  const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // modern method
      await navigator.clipboard.writeText(text);
    } else {
      // fallback method
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    showMessage("Copied successfully!", "green");

  } catch (err) {
    console.error("Failed to copy:", err);
    showMessage("Failed to copy!", "red");
  }
};

// message function
const showMessage = (text, color) => {
  const msg = document.createElement("div");
  msg.textContent = text;

  // Tailwind classes
  msg.className = `
    fixed bottom-6 right-6 
    px-4 py-2 rounded-lg text-white text-sm shadow-lg
    animate-bounce z-50s
    ${color === "green" ? "bg-green-600" : "bg-red-600"}
  `;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 2000);
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
            <p className="text-sm text-gray-800">Join Code</p>
            <p className="text-lg font-mono font-semibold">{joinCode}</p>
          </div>
          <button
            onClick={() => copyToClipboard(joinCode)}
            className="ml-3 px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* Expiry */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">Expires:</span>{" "}
          {formatExpiry(expiresAt)}
        </p>

        {/* Copy Invite Message */}
        <button
          onClick={() => copyToClipboard(inviteMessage)}
          className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer"
        >
          Copy Invite Message
        </button>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-lg bg-gray-800 text-white font-semibold
                      hover:bg-gray-700 active:scale-[0.98] transition cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
