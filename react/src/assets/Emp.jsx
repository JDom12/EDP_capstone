function Emp() {
    //login form here
    const imgLink = `https://randomuser.me/api/portraits/men/93.jpg`
    return (
        <>
            <div>
                <div>
                    <img src={imgLink} />
                </div>
                <div>
                    <p>Name: <br />
                        Phone number: <br />
                        Job role: <br />
                        Work location:
                    </p>
                </div>
            </div>
        </>
    )
}

export default Emp;