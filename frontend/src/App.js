import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { useStateValue } from "./state/stateprovider";
import Loader from "./utils/Loader";

function App() {
	const [loading, setLoading] = useState(false);
	const [{ user }] = useStateValue();
	return (
		<>
			{loading ? (
				<Loader loading={loading} />
			) : (
				<>
					{user ? (
						<Routes>
							<Route exact path='/home' element={<Home />} />
							<Route exact path='/profile/view/:id' element={<Profile />} />
						</Routes>
					) : (
						<Routes>
							<Route exact path='/' element={<div>Hello</div>} />
							<Route exact path='/register' element={<Register />} />
						</Routes>
					)}
				</>
			)}
		</>
	);
}

export default App;
