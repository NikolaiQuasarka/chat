import { useLoaderData } from "react-router"
import { isAuthorized, getCurrentUser } from "../../apis/auth"

export async function loader({ request }) {
	const authorized = await isAuthorized(request)
	console.log(authorized)
	if (authorized !== null) return authorized
	else {
		const currentUser = await getCurrentUser()
		return { currentUser }
	}
}
export default function Account() {
	const loaderData = useLoaderData()
	console.log(loaderData)
	return <h1>Current user is {loaderData.currentUser}</h1>
}
