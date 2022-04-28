
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {

  const { roomId } = useParams();
  
  // ! Temp list of messages, should be gotten already sorted from the backend
  const messages = [
    {
      content: "Msg1",
      id: 1
    }, 
    {
      content: "Msg2",
      id: 2
    }, 
    {
      content: "Msg3",
      id: 3
    }
  ];
  const [newMsg, setNewMsg] = useState("");

  const newMsgChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewMsg(event.target.value);
  };

  const sendMsg = () => {
    // TODO have a method that connects to the back end to send a message
    // sendMessage(newMsg); 
    setNewMsg("");
  }

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <div>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </div>
      <textarea
        value={newMsg}
        onChange={newMsgChange}
        placeholder="message"
      />
      <button type="button" onClick={sendMsg}>
        Send
      </button>
    </div>
  );
};

export default Room;