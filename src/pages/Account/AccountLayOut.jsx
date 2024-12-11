import { Outlet } from "react-router"
import { redirectIfUnAuthorized } from "../../apis/auth"

export default function AccountLayOut() {
	return (
		<main>
			<Outlet />
		</main>
	)
}
