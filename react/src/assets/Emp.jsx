import { useAuth } from "../hooks/AuthContent";

function Emp({ name, phone, role, location, salary, emp_id }) {
    const imgLink = `https://randomuser.me/api/portraits/men/93.jpg`;
    const { user } = useAuth();
    
    const canViewSalary = 
    user?.role === "HR" ||  
    user?.emp_id === emp_id || 
    user?.manages?.includes(emp_id); 

    return (
        <div className="emp-container">
            <div>
                <img src={imgLink} alt="Employee" />
            </div>
            <div>
                <p>
                    <strong>Name:</strong> {name} <br />
                    <strong>Phone number:</strong> {phone} <br />
                    <strong>Job role:</strong> {role} <br />
                    <strong>Work location:</strong> {location} <br />
                    {canViewSalary && (
                        <>
                            <strong>Salary:</strong> {salary} <br />
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Emp;