import React, {useState, useEffect} from "react";
import facade from "./apiFacade";


function LogIn({login}) {
	const init = {username: "", password: ""};
	const [loginCredentials, setLoginCredentials] = useState(init);

	const performLogin = (evt) => {
		evt.preventDefault();
		login(loginCredentials.username, loginCredentials.password);
	}
	const onChange = (evt) => {
		setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
	}

	return (
		<div>
      <div className="card">
        <div className="card-container">
        <h2>Login</h2>
        <p className="notLoggedInP">For at kunne bruge alle vores REST-endpoints bedes du logge ind.</p>
        <form onChange={onChange}>
          <br/>
          <input placeholder="Brugernavn" id="username"/>
          <br/>
          <input placeholder="Adgangskode" id="password"/>
          <br></br>
          <button className="btn btn-warning btn-cons" onClick={performLogin}>Login</button>
        </form>
        </div>
      </div>
		</div>
	)

}

function LoggedIn({user}) {
	const [dataFromServer, setDataFromServer] = useState("Loading...")

	useEffect(() => {
		facade.fetchData(user).then(data => setDataFromServer(data.msg));
	}, [user])

	return (
		<div>
			{dataFromServer}
		</div>
	)
}