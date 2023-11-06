'use client';

import { Button, Flex, Heading, Separator, TextField } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import Message from './message';

let socket: Socket;

const AlwaysScrollToBottom = ({ messages }: { messages: Array<Message> }) => {
  const elementRef = useRef(null);
  // elementRef will never be null
  // @ts-ignore
  useEffect(() => elementRef.current!.scrollIntoView({ behavior: 'smooth' }), [messages]);
  return <div ref={elementRef} />;
};

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
      {/* <div className='w-full box flex flex-col h-[89vh]'> */}
      <Flex className='h-[89vh]' direction='column' width='100%' grow='0' justify='between'>
      
        {/* Channel Name */}
        {/* <div className='grow-0 shrink basis-auto py-4'> */}
        <Flex direction='column' shrink='1' grow='0' py='4' >
          <Heading weight='bold'>
            {channelName}
          </Heading>
          <Separator size='4'/>
        </Flex>

        {/* Messages */}
        {/* <div className='flex flex-col overflow-y-scroll grow shrink basis-auto'> */}
        <Flex className='overflow-y-scroll' direction='column' shrink='1' grow='1'>
          {messages.map((msg: Message, i: number) => (
            <Message messageSender={msg.user.username} messageContent={msg.content} messageDate={msg.sentAt} key={i} />
          ))}
          <AlwaysScrollToBottom messages={messages} />
        </Flex>


        {/* Input */}
        {/* <div className='grow-0 shrink basis-10 pt-4'> */}
        <Flex direction='column' shrink='1' grow='0' pt='4'>
          <Separator mb='1' size='4'/>

          <div className='w-full pb-4'>
            <TextField.Root size='3'>
              <TextField.Input
                value={inputMessage}
                onInput={e => setInputMessage((e.target as HTMLInputElement).value)}
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
        </Flex>
      </Flex>
    </>
  );
}
