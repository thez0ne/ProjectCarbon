'use client';

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

type Message = {
  author: string;
  message: string;
};

export default function Messages({ user, channelName }: { user: any, channelName: string }) {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    console.log('initializing socker connection');
    socket = io();

    socket.on('messageReceived', (msg) => {
      console.log('someone sent: ', msg);
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
    });
    return () => { socket.disconnect(); }; //Close socket on UNMOUNT
  });

  const sendMessage = async () => {
    socket.emit('createdMessage', { author: user, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: user, message },
    ]);
    setMessage('');
  };

  const handleKeypress = (e: { keyCode: number; }) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <>
      <p className="font-bold text-white text-xl">
        Your usernameee: {user}
      </p>
      <div className="flex flex-col justify-end h-[20rem] min-w-[33%] rounded-md shadow-md ">
        <div className="h-full last:border-b-0 overflow-y-scroll">
          {messages.map((msg, i) => {
            return (
              <div
                className="w-full py-1 px-2 border-b border-gray-200"
                key={i}
              >
                {msg.author} : {msg.message}
              </div>
            );
          })}
        </div>
        {/* TODO remove temp input send */}
        <div className="border-t border-gray-300 w-full flex rounded-bl-md">
          <input
            type="text"
            placeholder="New message..."
            value={message}
            className="outline-none py-2 px-2 rounded-bl-md flex-1"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
            <button
              className="group-hover:text-white px-3 h-full"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
