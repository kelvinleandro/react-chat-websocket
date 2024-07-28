import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";

const PORT = import.meta.env.PORT || '3001';
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL || `http://localhost:${PORT}`;
const socket = io(VITE_SERVER_URL);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="px-8 flex items-center justify-center text-white bg-[url(/src/assets/background.jpg)] bg-no-repeat bg-cover w-full h-screen">
      {!showChat ? (
        <div className="w-fit flex flex-col justify-center items-center text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl py-8 px-4">
          <h1 className="text-3xl font-bold">Welcome to SocketGram</h1>
          <input
            type="text"
            placeholder="Your nickname"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="outline-none text-black p-2 rounded-md overflow-hidden w-[300px]"
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            className="outline-none text-black p-2 rounded-md overflow-hidden md:max-w-96 w-[300px]"
          />
          <button
            onClick={joinRoom}
            className="p-2 bg-blue-500 hover:bg-blue-700 rounded-md font-medium w-[300px]"
          >
            Join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
