import React from 'react';

function Die({value, handleDieClick, isHeld}) {
  return (
      <div className={`die ${isHeld ? "isHeld" : ""}`} onClick={handleDieClick}>{value}</div>
  )
};

export default Die;