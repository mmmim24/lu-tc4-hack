import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { auth, db } from "./firebase";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Products from "./pages/products";
import Product from "./pages/product";
import AddProduct from "./pages/add_product";
import Settings from "./pages/Settings";
import { useStateValue } from "./state/stateprovider";
import Loader from "./utils/Loader";

function App() {
	const [loading, setLoading] = useState(false);
	const [{ user }, action] = useStateValue();
	console.log(auth.currentUser);
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			auth.onAuthStateChanged(async (u) => {
				if (u) {
					const doc = await db
						.collection("users")
						.where("id", "==", u.uid)
						.get();

					action({
						type: "SET_USER",
						payload: {
							user: doc.docs[0].data(),
						},
					});
					setLoading(false);
				} else {
					setLoading(false);
				}
			});
		};
		fetch();
	}, []);

	return (
		<>
			{loading ? (
				<Loader loading={loading} />
			) : (
				<>
					{user ? (
						<Routes>
							<Route exact path='/' element={<Products />} />
							<Route exact path='/profile/settings' element={<Settings />} />
							<Route exact path='/profile/view/:id' element={<Profile />} />
							<Route exact path='/product/:id' element={<Product />} />
							<Route exact path='/product/add' element={<AddProduct />} />
							{/* <Route path='*' element={<Navigate to='/home' />} /> */}
						</Routes>
					) : (
						<Routes>
							<Route exact path='/register' element={<Register />} />
							{/* <Route path='*' element={<Navigate to='/register' />} /> */}
						</Routes>
					)}
				</>
			)}
		</>
	);
}

export default App;
