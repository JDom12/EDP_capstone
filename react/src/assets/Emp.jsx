import { useAuth } from "../hooks/AuthContent";
import './Emp.css'
function Emp({ name, phone, role, location, salary, emp_id }) {
    const gender = () => {
        const coin = Math.random();
        if (coin > 0.5){
            return "men"
        }

        else{
            return "women"
        }
    }

    const num = () => Math.floor(Math.random() * 99 + 1);

    const imgLink = `https://randomuser.me/api/portraits/${gender()}/${num()}.jpg`;
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