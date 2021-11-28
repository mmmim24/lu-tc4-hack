import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Products from "./pages/products";
import Product from "./pages/product";
import AddProduct from './pages/add_product'
import { useStateValue } from "./state/stateprovider";
import Loader from "./utils/Loader";

function App() {
	const [loading, setLoading] = useState(false);
	const [{ user }, action] = useStateValue();
	console.log(auth.currentUser);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user &&
				action({
					type: "SET_USER",
					payload: {
						user: user,
					},
				});
		});
	}, []);

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
							<Route exact path='/products' element={<Products />} />
							<Route exact path='/product/:id' element={<Product />} />
							<Route exact path='/product/add' element={<AddProduct />} />
							<Route
								path='*'
								element={user ? <NotFound /> : <Navigate to='/login' />}
							/>
						</Routes>
					) : (
						<Routes>
							<Route exact path='/' element={<div>Hello</div>} />
							<Route exact path='/register' element={<Register />} />
							<Route
								path='*'
								element={user ? <Navigate to='/home' /> : <NotFound />}
							/>
						</Routes>
					)}
				</>
			)}
		</>
	);
}

export default App;
