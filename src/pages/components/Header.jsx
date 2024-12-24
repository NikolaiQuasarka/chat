import { Link } from "react-router"
import { getUnAuthorized, isAuthorized } from "../../apis/auth"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../apis/firebseConfig"
import { useNavigate } from "react-router"

export default function Header() {
	const navigate = useNavigate()
	async function leaveAccountOnClickHandle() {
		await getUnAuthorized()
		navigate("/account/login")
	}
	const [isLeaveButtonVisible, setIsLeaveButtonVisible] = useState(false)
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			const authorized = await isAuthorized()
			if (authorized) setIsLeaveButtonVisible(true)
			else setIsLeaveButtonVisible(false)
		})
	})

	return (
		<header>
			<h1>
				<Link className="title">chat</Link>
			</h1>
			<section className="account-management">
				<Link to="account" className="current-account">
					Аккаунт
					<img className="current-account-img" />
				</Link>
				<button
					className={`leave-account ${
						isLeaveButtonVisible ? false : "unvisable"
					}`}
					onClick={leaveAccountOnClickHandle}
				>
					Выйти
					<img className="leave-account-img" />
				</button>
			</section>
		</header>
	)
}
