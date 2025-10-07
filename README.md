# Real-time Chat Application 💬

A modern, real-time chat application built with React, Node.js, and Socket.IO. Features instant messaging, typing indicators, and a beautiful responsive UI.

## 📸 Screenshots


### Login Screen
![Login Screen](https://github.com/Nuraaab/Realtime-chat-app/blob/570aa956d88572bda6d9d79ba47cbee8c24ce5b4/Screenshot%202025-10-07%20235431.png)

### Multi-User Chat
![Multi-User Chat](https://github.com/Nuraaab/Realtime-chat-app/blob/main/Screenshot%202025-10-08%20011050.png)
![Multi-User Chat](https://github.com/Nuraaab/Realtime-chat-app/blob/main/Screenshot%202025-10-08%20011632.png)

---

## ✨ Features

- 🚀 **Real-time Messaging** - Instant message delivery using WebSockets
- 💬 **Room-based Chat** - Join specific chat rooms with unique IDs
- 👥 **Multi-user Support** - Multiple users can chat simultaneously
- 🎨 **Modern UI** - Beautiful, responsive chat interface with message bubbles
- 🔌 **Connection Status** - Real-time connection status indicator
- ⏰ **Timestamps** - Message timestamps for all conversations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🐳 **Docker Support** - Easy deployment with Docker and Docker Compose
- ⚖️ **Load Balancing** - Nginx load balancer for horizontal scaling

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Socket.IO Client** - WebSocket client for real-time communication
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.IO** - WebSocket server for real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Load balancer and reverse proxy

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Docker** and **Docker Compose** (optional, for containerized deployment)

---

## 🚀 Getting Started

### Option 1: Local Development (Without Docker)

#### 1. Clone the repository
```bash
git clone https://github.com/Nuraaab/Realtime-chat-app.git
cd realtime-chat-app
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### 4. Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### 5. Start the Frontend Application
```bash
cd frontend
npm start
```
The frontend will open automatically at `http://localhost:3000`

---

### Option 2: Docker Deployment

#### Single Instance (Development)
```bash
docker-compose --profile single up
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend application on `http://localhost:3000`

#### Multi-Instance with Load Balancer (Production)
```bash
docker-compose --profile multi-instance up
```

This will start:
- 3 Backend servers (ports 5000, 5001, 5002)
- Frontend application on `http://localhost:3000`
- Nginx load balancer on `http://localhost:80`

#### Stop Docker Containers
```bash
docker-compose --profile single down
# or
docker-compose --profile multi-instance down
```

---

## 📖 How to Use

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your browser

2. **Enter Your Details**
   - Enter a username (e.g., "John")
   - Enter a room ID (e.g., "room1")
   - Click "Join Room"

3. **Start Chatting**
   - Type your message in the input field
   - Press Enter or click "Send"
   - See messages appear in real-time

4. **Chat with Multiple Users**
   - Open the app in another browser tab or device
   - Enter a different username but the **same room ID**
   - Both users can now chat in real-time!

---

## 🏗️ Project Structure

```
realtime-chat-app/
│
├── backend/                      # Node.js Backend
│   ├── src/                      # Source files
│   │   ├── chat/                 # Chat-related modules
│   │   ├── users/                # User-related modules
│   │   └── prisma/               # Database (Prisma ORM)
│   ├── server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   └── Dockerfile                # Backend Docker configuration
│
├── frontend/                     # React Frontend
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API services
│   │   ├── App.js                # Main application component
│   │   ├── App.css               # Application styles
│   │   └── index.js              # Application entry point
│   ├── package.json              # Frontend dependencies
│   └── Dockerfile                # Frontend Docker configuration
│
├── screenshots/                  # Application screenshots
├── docs/                         # Documentation
├── scripts/                      # Utility scripts
├── docker-compose.yml            # Docker Compose configuration
├── nginx.conf                    # Nginx configuration
└── README.md                     # This file
```

---

## 🔌 Socket.IO Events

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `join-room` | `roomId` | Join a specific chat room |
| `send-message` | `{ roomId, message, username }` | Send a message to a room |
| `typing` | `{ roomId, username, isTyping }` | Notify others of typing status |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `receive-message` | `{ id, username, message, timestamp }` | Receive a new message |
| `user-joined` | `userId` | Notification when a user joins the room |
| `user-typing` | `{ username, isTyping, userId }` | Receive typing indicator updates |



## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 📦 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run start:dev` - Alias for dev script

### Frontend
- `npm start` - Start the development server
- `npm run dev` - Alias for start script
- `npm run build` - Build for production
- `npm test` - Run tests

---








