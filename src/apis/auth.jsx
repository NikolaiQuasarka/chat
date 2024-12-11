import { redirect } from "react-router"
import { auth } from "./firebseConfig"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"

export async function redirectIfUnAuthorized(request) {
	const path = new URL(request.url).pathname
	const authorized = await isAuthorized()
	if (authorized) return null
	else return redirect(`/account/login?path=${path}`)
}
export async function isAuthorized() {
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) resolve(true)
			else resolve(false)
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

export async function createAccount(email, password) {
	return createUserWithEmailAndPassword(auth, email, password)
}
