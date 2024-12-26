import { Suspense } from "react"
import { Await } from "react-router"
export default function Message({
	newLocal,
	index,
	message,
	toppestMessageRef,
	getUserName,
	formattedDate,
}) {
	return (
		<article
			className={`message ${newLocal}`}
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
}
