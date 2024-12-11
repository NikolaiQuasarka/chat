import { redirect } from "react-router"
import { auth } from "./firebseConfig"
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"

export async function isAuthorized(request) {
	const path = new URL(request.url).pathname
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) resolve(null)
			else resolve(redirect(`/account/login?path=${path}`))
			unsubscribe()
		})
	})
}

export async function getAuthorized(email, password) {
	return signInWithEmailAndPassword(auth, email, password)
	//.then(userCredential=>{
}
export async function getUnAuthorized() {
	signOut(auth)
}

export async function getCurrentUser() {
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) resolve(user.email)
			else resolve(null)
			unsubscribe()
		})
	})
}
