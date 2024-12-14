import { ref, get, query, equalTo } from "firebase/database"
import { database } from "./firebseConfig"

const usersRef = ref(database, "users/")

export async function getUserNameByUid(uid) {
	const userRef = ref(database, `users/${uid}`)
	return get(userRef)
		.then((user) => {
			return user.val()
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}
