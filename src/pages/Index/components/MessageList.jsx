import { useEffect, useRef } from "react"

export default function MessageList({ messages }) {
	const messagesListElement = useRef(null)
	const bottom = useRef(null)
	const isScrolledToBottom = useRef(true)
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
