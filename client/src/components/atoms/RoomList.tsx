import React, { useState, useEffect } from 'react';

const ENDPOINT = 'http://localhost:8000/';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    const res = await fetch(ENDPOINT);
    const body = await res.json();
    setRooms(body);
  };

  useEffect(() => {
    getRooms();
  });

  const noRoom = () => {
    return (
      <div>
        <h2>방 목록</h2>
        <span>방이 없습니다.</span>
      </div>
    );
  };
  const someRooms = () => {
    return (
      <div>
        <h2>방 목록</h2>
        <ul>
          {rooms.map((room) => {
            return (
              <li key={room.roomId}>
                {room.roomId}번 방 - {room.roomState}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return <>{rooms.length === 0 ? noRoom : someRooms}</>;
};
export default RoomList;
