import { Link } from "react-router"
import { getUnAuthorized } from "../../apis/auth"

export default function Header() {
	async function leaveAccountOnClickHandle() {
		await getUnAuthorized()
	}
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
					className="leave-account"
					onClick={leaveAccountOnClickHandle}
				>
					Выйти
					<img className="leave-account-img" />
				</button>
			</section>
		</header>
	)
}
