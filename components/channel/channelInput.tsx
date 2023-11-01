'use client';

import { Button, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChannelInput({ user, channelName }: { user: any, channelName: string }) {
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleMessageSend = async () => {
    console.log(`I am ${user} have ${msg} and ${channelName}`);
    // TODO validate message

    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        message: msg,
        channel: channelName
      }),
    });
    if (response.ok) {
      router.refresh();
    } else {
      console.error(`Messenge Send Failed: ${response.status}`);
    }
  };

  // TODO setup keypress
  // const handleKeypress = (e: { keyCode: number; }) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     if (message) {
  //       sendMessage();
  //     }
  //   }
  // };

  // TODO connect this to the socket realtime temp chat window
  return (
    <div className='flex w-full'>
      <TextField.Root>
        <TextField.Input value={msg} onInput={e => setMsg(e.target.value)} placeholder='Enter Message'></TextField.Input>
        <TextField.Slot>
          <Button onClick={handleMessageSend}>Send</Button>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
