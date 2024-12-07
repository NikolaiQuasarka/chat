import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {} from "firebase/firestore"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
	apiKey: "AIzaSyDXmJ4MiM18m-ycIhiwTVeAwDEfb9apZO8",
	authDomain: "chat-a89c2.firebaseapp.com",
	databaseURL:
		"https://chat-a89c2-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-a89c2",
	storageBucket: "chat-a89c2.firebasestorage.app",
	messagingSenderId: "945249374914",
	appId: "1:945249374914:web:6f6f1c5417900689ae215b",
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)
