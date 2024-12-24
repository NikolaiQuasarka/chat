import { useEffect, useRef, a, Suspense } from "react"
import { auth } from "../../../apis/firebseConfig"
import { Await } from "react-router"

export default function MessageList({ messages, getUserName }) {
	const userId = auth.currentUser.uid
	const messagesListElement = useRef(null)
	const bottom = useRef(null)
	const isScrolledToBottom = useRef(true)
	const messagesElements = function () {
		return messages.map((message) => {
			const newLocal = message.sender_id === userId ? "mine" : false
			return (
				<article className={`message ${newLocal}`} key={message.key}>
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
			const element = messagesListElement.current
			const isAtBottom =
				element.scrollHeight - element.scrollTop ===
				element.clientHeight
			isScrolledToBottom.current = isAtBottom
		}
		const element = messagesListElement.current
		//element.addEventListener("scroll", handleScroll)
		return () => {
			element.removeEventListener("scroll", handleScroll)
		}
	}, [])
	useEffect(() => {
		const bottomElement = bottom.current
		const element = messagesListElement.current
		if (isScrolledToBottom.current) {
			bottomElement.scrollIntoView({
				behavior: "smooth",
			})
		}
	}, [messages])
	return (
		<section className="message-list" ref={messagesListElement}>
			{messagesElements()}
			<div className="bottom" ref={bottom}></div>
		</section>
	)
}
