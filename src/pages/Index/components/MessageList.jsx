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
	const bottomRef = useRef(null)
	const toppestMessageRef = useRef()
	const wasAtBottomRef = useRef(true)

	function isAtTop() {
		const messagesListElement = messagesListElementRef.current
		return messagesListElement.scrollTop === 0
	}
	function isAtBottom() {
		const messagesListElement = messagesListElementRef.current
		return (
			messagesListElement.scrollHeight - messagesListElement.scrollTop <=
			messagesListElement.clientHeight + 1
		)
	}
	async function handleScroll(e) {
		if (isAtTop()) {
			const currentToppestMessage = toppestMessageRef.current
			await loadPreviousMessages()
			currentToppestMessage.scrollIntoView()
		}
		wasAtBottomRef.current = isAtBottom()
	}

	useEffect(() => {
		if (wasAtBottomRef.current) {
			const messagesListEl = messagesListElementRef.current
			messagesListEl.scrollTop = messagesListEl.scrollHeight
		}
	})

	const messagesElements = function () {
		return messages.map((message, index) => {
			const newLocal = message.sender_id === userId ? "mine" : false
			const date = new Date(message.timestamp)
			const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			return (
				<article
					className={`message ${newLocal}`}
					key={message.key}
					ref={index === 0 ? toppestMessageRef : undefined}
				>
					<div className="sender">
						<Suspense fallback={<span>Загрузка идет...</span>}>
							<Await resolve={getUserName(message.sender_id)}>
								{(userName) => <>{userName}</>}
							</Await>
						</Suspense>
					</div>
					<div className="text">{message.content}</div>
					<div className="time">{formattedDate}</div>
				</article>
			)
		})
	}

	return (
		<section
			className="message-list"
			ref={messagesListElementRef}
			onScroll={handleScroll}
		>
			{messagesElements()}
			<div className="bottom" ref={bottomRef}></div>
		</section>
	)
}
