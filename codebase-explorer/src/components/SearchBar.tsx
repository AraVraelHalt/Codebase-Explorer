import React from 'react';

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <input
      type='text'
      placeholder='Search files...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        width: '94%',
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '10px',
        border: '1px solid #333',
        backgroundColor: '#1f1f1f',
        color: '#e0e0e0',
      }}
    />
  );
};

export default SearchBar;
