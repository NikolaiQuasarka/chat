import { redirect } from "react-router"
import { auth } from "./firebseConfig"
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"

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
export async function getUnAuthorized() {
	signOut(auth)
}

export async function getCurrentUser() {
	return new Promise((resolve) => {
		onAuthStateChanged(auth, (user) => {
			if (user) resolve(user.email)
			else resolve(null)
		})
	})
}
