import { Link } from "react-router"

export default function Header() {
	return (
		<header>
			<h1 className="title">chat</h1>
			<section className="account-management">
				<Link className="current-account">
					Аккаунт
					<img className="current-account-img" />
				</Link>
				<button className="leave-account">
					Выйти
					<img className="leave-account-img" />
				</button>
			</section>
		</header>
	)
}
