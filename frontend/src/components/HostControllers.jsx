function HostControls({ onInvite }) {
  return (
    <div className="p-3 border-b border-slate-200 bg-white">
      <button
        onClick={onInvite}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Invite Participants
      </button>
    </div>
  );
}

export default HostControls;