import {
	createBrowserRouter,
	createHashRouter,
	RouterProvider,
} from "react-router-dom"
import IndexLayout from "./pages/IndexLayout"
import Index, {
	loader as IndexLoader,
	action as IndexAction,
} from "./pages/Index/Index"
import AccountLayOut from "./pages/Account/AccountLayOut"
import NotLoggedIn from "./pages/Account/NotLoggedIn"
import Account, { loader as AccountLoader } from "./pages/Account/Account"
import LogIn, { action as LogInAction } from "./pages/Account/LogIn/LogIn"

export default function App() {
	const routes = createBrowserRouter([
		{
			element: <IndexLayout />,
			path: "/",
			children: [
				{
					index: true,
					element: <Index />,
					loader: IndexLoader,
					action: IndexAction,
				},
				{
					path: "account",
					//element: <AccountLayOut />,
					errorElement: <NotLoggedIn />,
					children: [
						{
							index: true,
							element: <Account />,
							loader: AccountLoader,
						},
						{
							path: "login",
							element: <LogIn />,
							action: LogInAction,
						},
						{ path: "signin" },
					],
				},
			],
		},
	])
	return <RouterProvider router={routes} />
}
