import { useLoaderData } from "react-router"
import { redirectIfUnAuthorized, getCurrentUser } from "../../apis/auth"

export async function loader({ request }) {
	const authorized = await redirectIfUnAuthorized(request)
	if (authorized !== null) return authorized
	else {
		const currentUser = await getCurrentUser()
		return { currentUser }
	}
}
export default function Account() {
	const loaderData = useLoaderData()
	return <h1>Current user is {loaderData.currentUser}</h1>
}
