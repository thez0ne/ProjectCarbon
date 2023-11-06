'use client';

import { Avatar, ContextMenu } from '@radix-ui/themes';

export default function Message({ messageSender, messageContent, messageDate }: { messageSender: User, messageContent: string, messageDate: Date }) {
  
  const CopyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data);
  };
  
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="w-full py-1 px-2 border-b border-dotted border-gray-200">
          <Avatar
            size='3'
            src={`${messageSender.image}`}
            fallback={`${messageSender.username[0]}`}
            radius='small'
            mr='4'
          />
          {messageSender.username} : {messageContent}
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item disabled>Sent At: {messageDate.toISOString().split('T')[0]} : {messageDate.toISOString().split('T')[1]}</ContextMenu.Item>
        <ContextMenu.Item onClick={()=>{ CopyToClipboard(messageContent); }}>Copy Message</ContextMenu.Item>
        <ContextMenu.Item onClick={()=>{ CopyToClipboard(messageSender.email); }}>Copy Sender Email</ContextMenu.Item>
        {messageSender.image ? 
          <ContextMenu.Item onClick={()=>{ CopyToClipboard(messageSender.image!); }}>Copy Sender Image Link</ContextMenu.Item>
        :
          <></>
        }

        <ContextMenu.Separator />

        <ContextMenu.Item color="red" disabled>
          Delete (WIP)
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
