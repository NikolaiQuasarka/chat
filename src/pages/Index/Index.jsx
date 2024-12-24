import "./Index.css"
import { getMessages, sendMessage, messagesRef } from "../../apis/messages"
import { useLoaderData } from "react-router"
import { useEffect, useState } from "react"
import { onChildAdded } from "firebase/database"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import { redirectIfUnAuthorized } from "../../apis/auth"
import { getUserNameByUid } from "../../apis/users"

export async function loader({ request }) {
	const authorized = await redirectIfUnAuthorized(request)
	if (authorized !== null) return authorized
	const messagesData = await getMessages()

	const namesArr = messagesData.map((val) => {
		return val.sender_id
	})
	const uniqueNamesArr = [...new Set(namesArr)]
	const usersNameData = await Promise.all(
		uniqueNamesArr.map((val) => {
			return getUserNameByUid(val)
		})
	)

	return { messagesData, usersNameData }
}
export async function action({ request }) {
	const formData = await request.formData()
	const content = formData.get("content")
	await sendMessage(content)
	return null
}

export default function Index() {
	const loaderData = useLoaderData()

	const [messages, setMessages] = useState(loaderData.messagesData)
	const [usersNames, setUsersNames] = useState(loaderData.usersNameData)

	function getUserName(uid) {
		//return usersNames[uid] || "Не удалось загрузить юзера"
		const userName = usersNames[uid]
		if (!userName) {
			const userName = getUserNameByUid(uid)
			setUsersNames((prev) => ({ ...prev, [uid]: userName }))
			return userName
		} else {
			return userName
		}
	}

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
				<MessageList getUserName={getUserName} messages={messages} />
				<MessageForm />
			</main>
		</div>
	)
}
