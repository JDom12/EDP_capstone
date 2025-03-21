import { useState, useEffect } from "react";
import './SalaryPredictor.css';

function SalaryPredictor() {
    const [jobRole, setJobRole] = useState("Analyst");
    const [location, setLocation] = useState("Hartford, CT");
    const [predictedSalary, setPredictedSalary] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {}, [jobRole, location]);
    

    const handlePredictSalary = async (e) => {
        e.preventDefault();

        if (!jobRole || !location) {
            setError("Please enter both job role and location.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: jobRole, location: location }),
            });

            const data = await response.json();

            if (response.ok) {
                setPredictedSalary(data["Salary prediction"]);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="salary-predictor">
            <h2>Salary Prediction Tool</h2>
            <h5>Use the dropdown to select a job role and location you'd like to predict the salary for.</h5>

            <form>
                <div>
                <label htmlFor="jobRole">Job Role</label>
                <select name="jobRole" id="jobRole" value={jobRole} onChange={e => setJobRole(e.target.value)} required>
                    <option value="Manager">Manager</option>
                    <option value="Analyst">Analyst</option>
                    <option value="CSR">CSR</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Security">Security</option>
                    <option value="Developer">Developer</option>
                </select>
                </div>
                <div>
                <label  htmlFor="location">Location</label>
                <select name="location" id="location" value={location} onChange = {e => setLocation(e.target.value)} required>
                    <option value="Hartford, CT">Hartford, CT</option>
                    <option value="New York City, NY">New York City, NY</option>
                    <option value="Atlanta, GA">Atlanta, GA</option>
                    <option value="Boston, MA">Boston, MA</option>
                    <option value="Los Angeles, CA">Los Angeles, CA</option>
                </select>
                </div>
                <button onClick={handlePredictSalary}>PREDICT SALARY</button>
            </form>

            {error && <p className="error">{error}</p>}

            {predictedSalary !== null && (
                <div>
                    <h3>Predicted Salary:</h3>
                    <p>${predictedSalary.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default SalaryPredictor;
