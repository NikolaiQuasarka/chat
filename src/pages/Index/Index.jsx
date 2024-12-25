import "./Index.css"
import {
	getLastMessages,
	sendMessage,
	messagesRef,
	getMessages,
} from "../../apis/messages"
import { useLoaderData } from "react-router"
import { useEffect, useRef, useState } from "react"
import { onChildAdded, query, startAt, orderByChild } from "firebase/database"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"
import { redirectIfUnAuthorized } from "../../apis/auth"
import { getUserNameByUid } from "../../apis/users"

export async function loader({ request }) {
	const authorized = await redirectIfUnAuthorized(request)
	if (authorized !== null) return authorized
	const messagesData = await getLastMessages(12)

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
	const isAllMessagesAreLoadedRef = useRef(false)
	const areMesssagesLoading = useRef(false)

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

	async function loadPreviousMessages() {
		if (
			!isAllMessagesAreLoadedRef.current &&
			!areMesssagesLoading.current
		) {
			areMesssagesLoading.current = true
			const messagesCount = 10
			const lastTimestamp = messages[0].timestamp || 0
			const previousMessages = await getMessages(
				lastTimestamp,
				messagesCount
			)
			setMessages((prev) => [...previousMessages, ...prev])
			areMesssagesLoading.current = false
			if (previousMessages.length < 10)
				isAllMessagesAreLoadedRef.current = true
		}
	}

	useEffect(() => {
		const lastTimestamp = messages[messages.length - 1]?.timestamp || 0
		const newMessagesQuery = query(
			messagesRef,
			orderByChild("timestamp"),
			startAt(lastTimestamp + 1)
		)
		const unsubscribe = onChildAdded(newMessagesQuery, (data) => {
			setMessages((prev) => {
				return [...prev, { ...data.val(), key: data.key }]
			})
		})
		return () => unsubscribe()
	}, [])
	return (
		<div id="Index">
			<main>
				<MessageList
					getUserName={getUserName}
					messages={messages}
					loadPreviousMessages={loadPreviousMessages}
				/>
				<MessageForm />
			</main>
		</div>
	)
}
