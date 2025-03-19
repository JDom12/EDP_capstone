import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (val) => {
    const value = val.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${value}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results: ', error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <ul className="results">
          {results.map((emp) => (
            <li key={emp.id}>
              <strong>{emp.name}</strong> - {emp.role} @ {emp.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
