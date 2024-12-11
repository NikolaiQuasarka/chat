import { Form } from "react-router"
import "./SignIn.css"
import { createAccount } from "../../../apis/auth"

export async function action({ request }) {
	try {
		const formData = await request.formData()
		const email = formData.get("email")
		const passwod = formData.get("password")

		await createAccount(email, passwod)
	} catch (err) {
		throw new Error(err.message)
	}
}

export default function SignIn() {
	return (
		<div id="signin">
			<main>
				<Form method="POST">
					<label htmlFor="">Email:</label>
					<input type="email" name="email" />
					<label htmlFor="">Password:</label>
					<input type="password" name="password" />
					<input type="submit" value="Зарегистрироваться" />
				</Form>
			</main>
		</div>
	)
}
