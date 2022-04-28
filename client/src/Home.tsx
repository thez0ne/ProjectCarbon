import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = useState('');

  const roomNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setRoomName(event.target.value);
  };

  return (
    <div>
      Home
      <input 
        type='text'
        placeholder='Room1'
        value={roomName}
        onChange={roomNameChange}
        className='text-input'
      />

      <Link to={`/room/${roomName}`}>
        Join Room
      </Link>

    </div>
  );
}

export default Home;
