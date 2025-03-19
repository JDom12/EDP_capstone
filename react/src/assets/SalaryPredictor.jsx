import { useState } from "react";

function SalaryPredictor() {
    const [jobRole, setJobRole] = useState("");
    const [location, setLocation] = useState("");
    const [predictedSalary, setPredictedSalary] = useState(null);
    const [error, setError] = useState(null);

    const handlePredictSalary = async () => {
        if (!jobRole || !location) {
            setError("Please enter both job role and location.");
            return;
        }

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ job_role: jobRole, location: location }),
            });

            const data = await response.json();

            if (response.ok) {
                setPredictedSalary(data.predicted_salary);
            } 
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="salary-predictor">
            <h2>Salary Prediction</h2>
            <input
                type="text"
                placeholder="Enter Job Role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handlePredictSalary}>Predict Salary</button>

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
