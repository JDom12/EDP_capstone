import { useState } from 'react';

function Search() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchClick = async () => {
    if (input.trim() === '') {
      setResults([]);
      return;
    }

    setQuery(input);

    try {
      const response = await fetch(`http://localhost:3000/api/search/${input}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearchClick}>Search</button>
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

export default Search;

