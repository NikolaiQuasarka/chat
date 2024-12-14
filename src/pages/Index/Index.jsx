import "./Index.css"
import { getMessages, sendMessage, messagesRef } from "../../apis/messages"
import { useLoaderData } from "react-router"
import { useEffect, useState } from "react"
import { onChildAdded } from "firebase/database"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import { redirectIfUnAuthorized } from "../../apis/auth"

export async function loader({ request }) {
	const authorized = await redirectIfUnAuthorized(request)
	if (authorized !== null) return authorized
	const data = await getMessages()
	return data
}
export async function action({ request }) {
	console.log("action")
	const formData = await request.formData()
	const content = formData.get("content")
	await sendMessage(content)
	return null
}

export default function Index() {
	const loaderData = useLoaderData()
	const [messages, setMessages] = useState(loaderData)

	useEffect(() => {
		const unsubscribe = onChildAdded(messagesRef, (data) => {
			setMessages((prev) => {
				return [...prev, { ...data.val(), key: data.key }]
			})
		})
		return () => unsubscribe()
	}, [])
	return (
		<div id="Index">
			<main>
				<MessageList messages={messages} />
				<MessageForm />
			</main>
		</div>
	)
}
