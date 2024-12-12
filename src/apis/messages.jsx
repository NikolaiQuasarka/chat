import { ref, get, set, push, serverTimestamp } from "firebase/database"
import { auth, database } from "./firebseConfig"

export const messagesRef = ref(database, `messages/`)

export async function getMessages() {
	return new Promise((resolve) => {
		const data = []
		console.log("getMassages here")
		const snapshot = get(messagesRef)
		Object.entries(snapshot).forEach(([key, value]) => {
			data.push({ ...value, key: key })
		})
		resolve(data)
	})
}

export async function sendMessage(message) {
	const newMessageRef = push(messagesRef)
	set(newMessageRef, {
		content: message,
		sender_id: auth.currentUser.uid,
		timestamp: serverTimestamp(),
	})
}
