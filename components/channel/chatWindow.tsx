'use client';

import { Button, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import Message from './message';

let socket: Socket;

export default function ChatWindow({ givenUser, channelName, currentMessages }: { givenUser: string, channelName: string, currentMessages: Array<Message> }) {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    setMessages(currentMessages);

    console.log('initializing socker connection');
    socket = io();

    socket.on('messageReceived', (msg: Message) => {
      console.log('someone sent: ', msg);
      setMessages((currentMsg) => [
        ...currentMsg,
        { user: msg.user, content: msg.content, sentAt: new Date(msg.sentAt) },
      ]);
    });
    return () => { socket.disconnect(); }; //Close socket on UNMOUNT
  }, [currentMessages]);

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
        username: givenUser,
        message: inputMessage,
        channel: channelName
      }),
    });

    if (!response.ok) {
      console.error(`Messenge failed to send to backend: ${response.status}`);
    }

    // sending to other users
    socket.emit('createdMessage', { user: { username: givenUser }, content: inputMessage, sentAt: msgDate });

    // adding message locally
    setMessages((currentMsg) => [
      ...currentMsg,
      { user: { username: givenUser }, content: inputMessage, sentAt: msgDate },
    ]);
    setInputMessage('');
  };

  const handleKeypress = (e: { keyCode: number; }) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (inputMessage) {
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
            {messages.map((msg: Message, i: number) => (
              <Message messageSender={msg.user.username} messageContent={msg.content} messageDate={msg.sentAt} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div />

      {/* Input */}
      <div className='flex w-full'>
        <TextField.Root>
          <TextField.Input
            value={inputMessage}
            onInput={e => setInputMessage(e.target.value)}
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
