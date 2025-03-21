import { useState } from 'react';
import Emp from './Emp';
import { useAuth } from "../hooks/AuthContent";
import './Search.css'

function Search() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { user } = useAuth()
  

  console.log("User ID:", user?.emp_id);
  console.log("Role:", user?.role);
  console.log("Manages:", user?.manages.length > 0 ? user.manages : "No direct reports");

  const handleSearchClick = async () => {
    if (input.trim() === '') {
      setResults([]);
      return;
    }

    setQuery(input);

    try {
      const response = await fetch(`http://54.184.251.178:3000/api/search/${input}`);
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
            <div className="emp-list">
                {results.map((emp) => (
                    <Emp 
                        key={emp.id}
                        emp_id={emp.id} 
                        name={emp.name} 
                        phone={emp.phone} 
                        role={emp.role} 
                        location={emp.location} 
                        salary={emp.salary}
                    />
                ))}
            </div>
        )}
    </div>
  );
}

export default Search;

