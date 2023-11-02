'use client';

import { Button, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

export default function ChatWindow({ user, channelName, currentMessages }: { user: any, channelName: string, currentMessages: Array<Message> }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    setMessages(currentMessages);

    console.log('initializing socker connection');
    socket = io();

    socket.on('messageReceived', (msg: Message) => {
      console.log('someone sent: ', msg);
      setMessages((currentMsg) => [
        ...currentMsg,
        { user: msg.user, content: msg.content, sentAt: msg.sentAt },
      ]);
    });
    return () => { socket.disconnect(); }; //Close socket on UNMOUNT
  }, []);

  const sendMessage = async () => {
    const msgDate = new Date();
    // TODO validate message
    // sending to database
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        message: message,
        channel: channelName
      }),
    });

    if (!response.ok) {
      console.error(`Messenge failed to send to backend: ${response.status}`);
    }

    // sending to other users
    socket.emit('createdMessage', { user: user, message, sentAt: msgDate });

    // adding message locally
    setMessages((currentMsg) => [
      ...currentMsg,
      { user: user, content: message, sentAt: msgDate },
    ]);
    setMessage('');
  };

  const handleKeypress = (e: { keyCode: number; }) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
      console.log('enter was pressed');
    }
  };

  return (
    <>
      {/* Messages */}
      <div className='w-full'>
        <div className="flex flex-col justify-end h-[20rem] min-w-[33%] rounded-md shadow-md ">
          <div className="h-full last:border-b-0 overflow-y-scroll">
            {messages.map((msg: Message, i: number) => {
              // TODO setup using a message component
              return (
                <div
                  className="w-full py-1 px-2 border-b border-gray-200"
                  key={i}
                >
                  [{msg.sentAt.toISOString().split('T')[0]} : {msg.sentAt.toISOString().split('T')[1]}] {msg.user.username} : {msg.content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div />

      {/* Input */}
      <div className='flex w-full'>
        <TextField.Root>
          <TextField.Input
            value={message}
            onInput={e => setMessage(e.target.value)}
            placeholder='Enter Message'
            onKeyUp={handleKeypress}
          ></TextField.Input>
          <TextField.Slot>
            <Button onClick={sendMessage}>
              Send
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </div>
    </>
  );
}
