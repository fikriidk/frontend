import React from 'react';

const FilterItem = ({ label, selected, onSelect }) => {
  return (
    <div
      style={{
        padding: '5px',
        margin: '5px',
        background: selected ? '#ccc' : '#fff',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(!selected)}
    >
      {label}
    </div>
  );
};

export default FilterItem;
