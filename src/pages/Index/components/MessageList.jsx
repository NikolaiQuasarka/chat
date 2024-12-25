import { useEffect, useRef, Suspense } from "react"
import { auth } from "../../../apis/firebseConfig"
import { Await } from "react-router"

export default function MessageList({
	messages,
	getUserName,
	loadPreviousMessages,
}) {
	const userId = auth.currentUser.uid
	const messagesListElementRef = useRef(null)
	const bottom = useRef(null)
	const isScrolledToBottom = useRef(true)
	const toppestMessage = useRef()
	function isAtTop() {
		const messagesListElement = messagesListElementRef.current
		return messagesListElement.scrollTop === 0
	}
	async function handleScroll(e) {
		if (isAtTop()) {
			const messagesListEl = messagesListElementRef.current
			const height = messagesListEl.scrollHeight
			const scrollTop = messagesListEl.scrollTop
			const currentToppestMessage = toppestMessage.current
			await loadPreviousMessages()
			currentToppestMessage.scrollIntoView()
			//messagesListEl.scrollTop = messagesListEl.scrollTop - height
		}
	}
	const messagesElements = function () {
		return messages.map((message, index) => {
			const newLocal = message.sender_id === userId ? "mine" : false
			return (
				<article
					className={`message ${newLocal}`}
					key={message.key}
					ref={index === 0 ? toppestMessage : undefined}
				>
					<div className="sender">
						<Suspense fallback={<span>Загрузка идет...</span>}>
							<Await resolve={getUserName(message.sender_id)}>
								{(userName) => <>{userName}</>}
							</Await>
						</Suspense>
					</div>
					<div className="text">{message.content}</div>
				</article>
			)
		})
	}
	useEffect(() => {
		const handleScroll = (e) => {
			//e.preventDefault()
			const element = messagesListElementRef.current
			const isAtBottom =
				element.scrollHeight - element.scrollTop ===
				element.clientHeight
			isScrolledToBottom.current = isAtBottom
		}
		const element = messagesListElementRef.current
		//element.addEventListener("scroll", handleScroll)
		return () => {
			element.removeEventListener("scroll", handleScroll)
		}
	}, [])
	useEffect(() => {
		const bottomElement = bottom.current
		const element = messagesListElementRef.current
		if (isScrolledToBottom.current) {
			//bottomElement.scrollIntoView({
			//behavior: "smooth",
			//})
		}
	}, [messages])
	return (
		<section
			className="message-list"
			ref={messagesListElementRef}
			onScroll={handleScroll}
		>
			{messagesElements()}
			<div className="bottom" ref={bottom}></div>
		</section>
	)
}
