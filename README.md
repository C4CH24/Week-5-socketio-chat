Socket.io Real-Time Chat Application
A modern, real-time chat application built with React, Node.js, and Socket.io. Features instant messaging, user presence, typing indicators, and more.

https://img.shields.io/badge/React-18.2.0-blue https://img.shields.io/badge/Socket.io-4.7.2-green https://img.shields.io/badge/Node.js-18+-brightgreen

🚀 Features
✅ Implemented Features
Real-time messaging - Instant message delivery using Socket.io

User authentication - Simple username-based login

Online user list - See who's currently online

Typing indicators - Know when someone is typing

User presence - Real-time join/leave notifications

Responsive design - Works on desktop and mobile devices

Message timestamps - See when messages were sent

🔄 Coming Soon
Private messaging

Multiple chat rooms

File and image sharing

Read receipts

Message reactions

Push notifications

🛠️ Tech Stack
Frontend:

React 18

Vite (Build tool)

Socket.io Client

CSS3 (Responsive design)

Backend:

Node.js

Express.js

Socket.io

CORS

📦 Installation
Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

Setup Instructions
Clone the repository

```bash
git clone <your-repository-url>
cd socketio-chat
```
Install server dependencies

```bash
cd server
npm install
```
Install client dependencies

```bash
cd ../client
npm install
```
Start the development servers

Terminal 1 - Backend Server:

```bash
cd server
npm run dev
```
Server will run on http://localhost:5000

Terminal 2 - Frontend Client:

```bash
cd client
npm run dev
```
Client will run on http://localhost:3000

Open your browser
Navigate to http://localhost:3000 to use the application.

🎯 Usage
Join the Chat

Enter your username on the login screen

Click "Join" to enter the chat room

Send Messages

Type your message in the input field

Press Enter or click "Send" to send

See typing indicators when others are composing messages

User Presence

View online users in the sidebar

Receive notifications when users join or leave

See real-time connection status

📁 Project Structure
```text
socketio-chat/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── socket/        # Socket.io client configuration
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Application styles
│   │   └── main.jsx       # Application entry point
│   └── package.json       # Client dependencies
├── server/                # Node.js backend
│   ├── server.js          # Main server file
│   └── package.json       # Server dependencies
└── README.md             # Project documentation
```
🔧 API Events
Client to Server
user_join - User joins the chat

send_message - Send a new message

typing_start - User starts typing

typing_stop - User stops typing

Server to Client
receive_message - Receive a new message

user_joined - User joined notification

user_left - User left notification

users_online - Updated online users list

typing_update - Typing users update

🎨 Screenshots
## Screenshots

### Login Screen
![Login Screen](screenshots/Login%20Screen.png)

### Main Chat Interface
![Main Chat Interface](screenshots/Main%20Chat%20Interface.png)

### Mobile View
![Mobile View](screenshots/Mobile%20view.png)

🚀 Deployment
Deploy Backend (Server)
The server can be deployed to:

Render - Free tier available

Railway - Developer-friendly

Heroku - Classic platform

DigitalOcean - Flexible options

Deploy Frontend (Client)
The client can be deployed to:

Vercel - Recommended for React apps

Netlify - Easy static hosting

GitHub Pages - Free for public repos

Environment Variables
Create a .env file in the server directory:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
```
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 Future Enhancements
Private messaging between users

Multiple chat rooms/channels

File and image sharing

Read receipts

Message reactions (emojis)

Message search functionality

User profiles and avatars

Message persistence with database

End-to-end encryption

Voice and video calling

🐛 Troubleshooting
Common Issues
Connection Issues

Ensure both server and client are running

Check that ports 3000 and 5000 are available

Verify CORS configuration in server

Socket.io Version Mismatch

Make sure server and client use compatible Socket.io versions

Current versions: Server v4.7.2, Client v4.7.2

Messages Not Sending

Check browser console for errors

Verify Socket.io connection status

Ensure username is set before sending messages

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Your Name - Initial work

🙏 Acknowledgments
Socket.io team for excellent real-time communication library

React team for the amazing frontend framework

Vite team for the fast build tool