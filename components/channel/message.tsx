'use client';

// TODO add image depending on if github user or normal user
export default function Message({ messageSender, messageContent, messageDate }: { messageSender: string, messageContent: string, messageDate: Date }) {
  return (
    <div className="w-full py-1 px-2 border-b border-gray-200">
      [{messageDate.toISOString().split('T')[0]} : {messageDate.toISOString().split('T')[1]}] {messageSender} : {messageContent}
    </div>
  );
}
