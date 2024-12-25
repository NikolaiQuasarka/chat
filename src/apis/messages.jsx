import {
	ref,
	get,
	set,
	push,
	serverTimestamp,
	query,
	limitToLast,
	orderByChild,
	startAt,
	endAt,
} from "firebase/database"
import { auth, database } from "./firebseConfig"

export const messagesRef = ref(database, `messages/`)

export async function getLastMessages(messagesCount) {
	const data = []
	const lastMessages = query(
		messagesRef,
		orderByChild("timestamp"),
		limitToLast(messagesCount)
	)
	const snapshot = await get(lastMessages)
	if (snapshot.exists()) {
		const snapshotVal = snapshot.val()
		console.log(snapshotVal)
		Object.entries(snapshotVal).forEach(([key, value]) => {
			console.log("Key", key, "Value", value)
			data.push({ ...value, key: key })
		})
		return data
	} else return []
}

export async function getMessages(timestamp, messagesCount) {
	const data = []
	const messagesQuery = query(
		messagesRef,
		orderByChild("timestamp"),
		endAt(timestamp - 1),
		limitToLast(messagesCount)
	)
	const snapshot = await get(messagesQuery)
	snapshot.forEach((childSnapshot) => {
		data.push({ ...childSnapshot.val(), key: childSnapshot.key })
	})
	return data
}

export async function sendMessage(message) {
	const newMessageRef = push(messagesRef)
	set(newMessageRef, {
		content: message,
		sender_id: auth.currentUser.uid,
		timestamp: serverTimestamp(),
	})
}
