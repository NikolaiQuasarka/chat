import "./Index.css"
import { getMessages, sendMessage, messagesRef } from "../../apis/messages"
import { Form, useLoaderData, useNavigation } from "react-router"
import { useEffect, useRef, useState } from "react"
import { onChildAdded } from "firebase/database"
import MessageList from "./components/MessageList"
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
	const navigation = useNavigation()
	const formRef = useRef()

	useEffect(() => {
		const unsubscribe = onChildAdded(messagesRef, (data) => {
			setMessages((prev) => {
				return [...prev, { ...data.val(), key: data.key }]
			})
		})
		return () => unsubscribe()
	}, [])
	useEffect(() => {
		if (navigation.state === "idle") formRef.current.reset()
	}, [navigation.state])
	return (
		<div id="Index">
			<main>
				<MessageList messages={messages} />
				<Form method="POST" replace ref={formRef}>
					<div className="text-border">
						<textarea name="content" />
					</div>
					<input type="submit" value="Отправить" />
				</Form>
			</main>
		</div>
	)
}
