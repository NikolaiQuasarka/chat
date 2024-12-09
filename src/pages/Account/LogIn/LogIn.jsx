import { Form } from "react-router"
import "./LogIn.css"
import { getAuthorized } from "../../../apis/auth"

export async function action({ request }) {
	const formData = await request.formData()
	const email = formData.get("email")
	const password = formData.get("password")
	await getAuthorized(email, password)
}

export default function LogIn() {
	return (
		<div id="login">
			<main>
				<Form method="POST">
					<label>Электронная почта:</label>
					<input type="email" name="email" />
					<label>Пароль:</label>
					<input type="password" name="password" />
					<input type="submit" value="Войти" />
				</Form>
			</main>
		</div>
	)
}
