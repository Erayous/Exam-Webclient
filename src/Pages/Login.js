import React, {useState, useEffect} from "react";
import facade from "../apiFacade";


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
			<div class="row">
			<div class="offset-s4 col s4 offset-s4">
				<div class="card-panel">
				<form onChange={onChange} style={{display: "inline-block"}}>
					<br/>
		
						<div class="col s12">
							<input placeholder="Brugernavn" id="username"/>
						</div>
				
						<div class="col s12">
							<input placeholder="Adgangskode" id="password"/>
						</div>
				
					<br/>
					<div class="col s12">
						<button className="waves-effect waves-light btn" onClick={performLogin}>Login</button>
					</div>
					<br/>
					
				</form>
				</div>
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

export function Login() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState("");  
  
	const logout = () => {
		facade.logout();
		setLoggedIn(false)

	}
	const login = (user, pass) => {
		facade.login(user, pass).then(res => setLoggedIn(true));
		setUser(user);
	}
	const token = localStorage.getItem("jwtToken");
	
	return (
	  
	  <div>
		<div class="row">
			<div class="offset-s4 col s4 offset-s4">
			<br></br>
			<center>
				<h5>Login</h5>
				<hr />
				<p>Log ind for at kunne gemme dine ugeplaner</p>
				
			</center>
			</div>
      	</div>
  
		{!loggedIn ? (<LogIn login={login} />) :
		  (<div>
			<div class="row">
			<div class="offset-s3 col s6 offset-s3">
				<div class="card-panel">
					<div class="row">
					<div class="col s12">
						<p className="LoggedInP">Du er nu logget ind</p>
						<hr/>
						<p>Serveren svarede: </p>
						<p className="pnoOverflow" style={{fontSize: "12px"}}><LoggedIn user={user} /></p>
						<p className="pnoOverflow" style={{fontSize: "12px"}}><b>Token: </b>{token}</p>
						<br></br>

						<button className="waves-effect waves-light btn" onClick={logout}>Opret ugeplan</button>
						<hr />
						<button className="waves-effect waves-light btn" onClick={logout}>Log ud</button>
					</div>
					</div>
				</div>
			</div>
			</div>
		  </div>)}
		
	  </div>
	);
  }

  