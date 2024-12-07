import { createBrowserRouter, RouterProvider } from "react-router-dom"
import IndexLayout from "./pages/IndexLayout"
import Index, {
	loader as IndexLoader,
	action as IndexAction,
} from "./pages/Index/Index"

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
				{ path: "registration" },
				{ path: "login" },
			],
		},
	])
	return <RouterProvider router={routes} />
}
