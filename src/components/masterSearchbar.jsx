import React, { useState } from 'react';

export default function MasterNavbar() {
const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the searchQuery to the parent component or perform the search logic here
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
}
