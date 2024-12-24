import { redirect } from "react-router"
import { auth, database } from "./firebseConfig"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"
import { push, ref, set } from "firebase/database"

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

async function registName(uid, name) {
	const usersRef = ref(database, `users/${uid}`)
	return set(usersRef, name)
}
export async function createAccount(email, name, password) {
	return createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => registName(userCredential.user.uid, name)
	)
}
