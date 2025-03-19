function Emp({ name, phone, role, location }) {
    const imgLink = `https://randomuser.me/api/portraits/men/93.jpg`;

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
                    <strong>Work location:</strong> {location}
                </p>
            </div>
        </div>
    );
}

export default Emp;