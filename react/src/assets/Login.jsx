function Login() {
//login form here

return (
    <>
        <div>
        <form>
            <label for="id">Employee ID </label>
            <input type="text" id='id'/><br/>
            <label for="pass">Password </label>
            <input type="text" id='pass'/><br/>
            <input type="submit" value="Submit"/>
        </form>
        </div>
    </>
)
}

export default Login;