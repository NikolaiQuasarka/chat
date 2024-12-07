import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./index.css"

export default function IndexLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
