import { Form, useNavigation } from "react-router"
import { useEffect, useRef, useState } from "react"
export default function MessageForm() {
	const navigation = useNavigation()
	const submitBtnRef = useRef()
	const textareaRef = useRef()
	const [formText, setFormText] = useState("")

	useEffect(() => {
		if (navigation.state === "idle") setFormText("")
	}, [navigation.state])

	function sendMessage(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			submitBtnRef.current.click()
		}
	}
	return (
		<Form method="POST" replace>
			<div className="text-border">
				<textarea
					ref={textareaRef}
					name="content"
					onKeyDown={sendMessage}
					value={formText}
					onInput={(e) => setFormText(e.target.value)}
				/>
			</div>
			<input
				ref={submitBtnRef}
				type="submit"
				value="Отправить"
				onClick={() => textareaRef.current.focus()}
				disabled={formText ? false : true}
			/>
		</Form>
	)
}
