import { Outlet } from "react-router"
import { isAuthorized } from "../../apis/auth"

export default function AccountLayOut() {
	return (
		<main>
			<Outlet />
		</main>
	)
}
