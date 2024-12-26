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
	function calculateRowsCount() {
		const textarea = textareaRef.current
		if (textarea) {
			const lineHeight = 5
			const lines = Math.floor(textarea.height / lineHeight)
			return lines
		}
		return 1
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
					rows={2}
				/>
			</div>
			<input
				ref={submitBtnRef}
				type="submit"
				value="Отправить"
				onClick={() => textareaRef.current.focus()}
				disabled={
					formText || !navigation.state === "idle" ? false : true
				}
			/>
		</Form>
	)
}
