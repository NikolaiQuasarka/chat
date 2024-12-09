import { isAuthorized } from "../../apis/auth"

export async function loader() {
	return await isAuthorized()
}
export default function Account() {
	return <h1>Account</h1>
}
