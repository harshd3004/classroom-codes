# Classroom Codes

> A real-time classroom dashboard where students instantly broadcast code snippets to a teacher's view. Features a live directory of all active students, one-click code copying, and syntax highlighting. No complex setup—just create a room and code.


## 🚀 Features

* **Instant Code Broadcasting:** As students type, their code is transmitted in real-time to the teacher's dashboard using WebSockets.
* **Directory View:** Teachers get a "Bird's Eye View" of the entire class in a grid layout.
* **Ephemeral Rooms:** No long sign-up processes. Teachers create a room code; students join with a nickname.
* **Professional Editor:** Powered by Monaco Editor (VS Code engine) for rich syntax highlighting.
* **One-Click Copy:** Easily copy any student's solution to your clipboard for review or demonstration.

## 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Monaco Editor
* **Backend:** Node.js, Express
* **Real-time Engine:** Socket.io
* **Database:** MongoDB

## 🏗 High-Level Architecture

1. **Teacher Client:** Emits `create_room` event. Listening for `room_update` events.
2. **Student Client:** Emits `join_room` and `code_change` events.
3. **Server:** Maps socket IDs to Room IDs. Broadcasts code updates only to the room admin (Teacher) to optimize bandwidth.

## 📦 Installation & Setup

This project uses a mono-repo structure (Client and Server in one repo).

### Prerequisites

* Node.js (v14+)
* npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/harshd3004/classroom-codes.git
cd classroom-codes
```

### 2. Server Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 3. Client Setup

```bash
cd server
npm install
npm start
# App runs on http://localhost:3000

```

## 🔮 Roadmap (v2)

* [ ] **Shared Whiteboard:** A canvas for teachers to draw diagrams that sync to all student screens.
* [ ] **Syntax Selection:** Allow students to pick Python, JS, C++, etc.
* [ ] **"Raise Hand" Feature:** A button for students to signal they are stuck.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
**Would you like me to write the `server.js` file with the basic Room and Socket logic?**
