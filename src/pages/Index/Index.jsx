import "./Index.css"
import { getMessages, sendMessage, messagesRef } from "../../apis/messages"
import { Form, useLoaderData, useNavigation } from "react-router"
import { useEffect, useRef, useState } from "react"
import { onChildAdded } from "firebase/database"

export async function loader() {
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
	const messagesListElement = useRef(null)
	const bottom = useRef(null)
	const isScrolledToBottom = useRef(true)
	const navigation = useNavigation()
	const formRef = useRef()

	const messagesElements = function () {
		return messages.map((message) => {
			return (
				<article className="message" key={message.key}>
					<div className="sender">{message.key}</div>
					<div className="text">{message.content}</div>
				</article>
			)
		})
	}

	useEffect(() => {
		const unsubscribe = onChildAdded(messagesRef, (data) => {
			setMessages((prev) => {
				return [...prev, { ...data.val(), key: data.key }]
			})
		})
		return () => unsubscribe()
	}, [])

	useEffect(() => {
		const handleScroll = () => {
			const element = messagesListElement.current
			const isAtBottom =
				element.scrollHeight - element.scrollTop ===
				element.clientHeight
			isScrolledToBottom.current = isAtBottom
		}
		const element = messagesListElement.current
		element.addEventListener("scroll", handleScroll)
		return () => {
			element.removeEventListener("scroll", handleScroll)
		}
	}, [])
	useEffect(() => {
		const bottomElement = bottom.current
		if (isScrolledToBottom.current) {
			bottomElement.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	useEffect(() => {
		if (navigation.state === "idle") formRef.current.reset()
	}, [navigation.state])
	return (
		<div id="Index">
			<main>
				<section className="message-list" ref={messagesListElement}>
					{messagesElements()}
					<div className="bottom" ref={bottom}></div>
				</section>
				<Form method="POST" replace ref={formRef}>
					<textarea name="content" />
					<input type="submit" value="Отправить" />
				</Form>
			</main>
		</div>
	)
}
