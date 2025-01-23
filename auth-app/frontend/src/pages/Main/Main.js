import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Main = () => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
		);
	const logout = async (inputs) => {
			await axios.post("/auth/logout");
		setCurrentUser(null);
	  };
	  useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	  }, [currentUser]);
	
	  	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>MicroserviciosProyectoFinal</h1>
				<Link to='/login'>
		<button className={styles.white_btn} onClick={logout}>
	Logout
			</button>
			</Link>
			</nav>
			<h1>Welcome to frontend</h1>
		</div>
	);
};

export default Main;