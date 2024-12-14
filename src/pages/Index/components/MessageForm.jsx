import { Form, useNavigation } from "react-router"
import { useEffect, useRef } from "react"
export default function MessageForm() {
	const navigation = useNavigation()
	const formRef = useRef()
	useEffect(() => {
		if (navigation.state === "idle") formRef.current.reset()
	}, [navigation.state])

	return (
		<Form method="POST" replace ref={formRef}>
			<div className="text-border">
				<textarea name="content" />
			</div>
			<input type="submit" value="Отправить" />
		</Form>
	)
}
