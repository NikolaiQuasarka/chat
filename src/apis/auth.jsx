import { redirect } from "react-router"
import { auth } from "./firebseConfig"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

export async function isAuthorized() {
	return new Promise((resolve) => {
		onAuthStateChanged(auth, (user) => {
			if (user) resolve(null)
			else resolve(redirect("/account/login"))
		})
	})
}

export async function getAuthorized(email, password) {
	signInWithEmailAndPassword(auth, email, password)
	//.then(userCredential=>{
}
