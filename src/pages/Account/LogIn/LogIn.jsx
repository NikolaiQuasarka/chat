import { Form, redirect, useSearchParams } from "react-router"
import "./LogIn.css"
import { getAuthorized } from "../../../apis/auth"

export async function action({ request }) {
	const url = new URL(request.url)
	const redirectPath = url.searchParams.get("path") || "/"
	const formData = await request.formData()
	try {
		const email = formData.get("email")
		const password = formData.get("password")
		await getAuthorized(email, password)
		return redirect(redirectPath)
	} catch (err) {
		const params = new URLSearchParams(url.search)
		params.set("message", "Не удалось войти")
		const urlError = `/account/login?${params.toString()}`
		//urlError.searchParams.set("error", err.message)
		return redirect(urlError)
	}
}

export default function LogIn() {
	const [searchParams, setSearchParams] = useSearchParams()
	const errorMessage = searchParams.get("message")
	return (
		<div id="login">
			<main>
				<Form method="POST">
					<label>Электронная почта:</label>
					<input type="email" name="email" />
					<label>Пароль:</label>
					<input type="password" name="password" />
					{errorMessage && <span>{errorMessage}</span>}
					<input type="submit" value="Войти" />
				</Form>
			</main>
		</div>
	)
}
