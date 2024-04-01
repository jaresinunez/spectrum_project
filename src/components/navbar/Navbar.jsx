import './Navbar.css'
import React from 'react';

const Navbar = ({ maps, onSelectMap }) => {
const handleClick = (mapId) => {
    console.log('Map clicked:', mapId);
    onSelectMap(mapId);
    };

  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'lightgray', padding: '10px' }}>
      {maps.map(map => (
        <button key={map.id} onClick={() => handleClick(map.id)}>{map.title}</button>
      ))}
    </nav>
  );
};

export default Navbar;

