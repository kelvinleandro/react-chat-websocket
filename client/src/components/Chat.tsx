import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

import IconSendFill from "./IconSendFill";

interface Props {
  socket: Socket;
  username: string;
  room: string;
}

interface Message {
  room: string;
  id: string | undefined;
  author: string;
  message: string;
  time: string;
}

const Chat = ({ socket, username, room }: Props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      const message: Message = {
        room,
        id: socket.id,
        author: username,
        message: currentMessage,
        time: timeString,
      };
      setMessageList((prev) => [...prev, message]);
      await socket.emit("send_message", message);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-xl pb-8 pt-4 px-4">
      <div className="w-full py-3 mb-2 bg-slate-900 text-white font-bold text-center cursor-default">
        <p>Room: {room}</p>
      </div>
      <div className="bg-transparent h-[70vh]">
        <ScrollToBottom
          className="w-full h-full overflow-x-hidden overflow-y-scroll no-scrollbar"
          scrollViewClassName="flex flex-col"
        >
          {messageList.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col p-2.5 mb-2 rounded-md w-[70%] sm:w-80 ${
                  message.id === socket.id
                    ? "bg-purple-800 self-end"
                    : "bg-slate-800 self-start"
                }`}
              >
                <p className="font-bold">{message.author}</p>
                <p>{message.message}</p>
                <p className="text-sm font-light text-end">{message.time}</p>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="flex flex-row justify-between items-center bg-slate-900 p-2 overflow-hidden rounded-md space-x-2">
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="outline-none bg-transparent flex-1"
        />
        <IconSendFill
          onClick={sendMessage}
          className="cursor-pointer w-5 h-5 hover:text-white/70"
        />
      </div>
    </div>
  );
};

export default Chat;
