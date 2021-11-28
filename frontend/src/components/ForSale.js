import React, { useEffect } from "react";
import { db } from "../firebase";
import ProductCard from "./products/product";

const ForSale = () => {
	const [products, setProducts] = React.useState([]);
	const history = window.location.pathname;
	console.log(history);
	useEffect(() => {
		const uid = history.split("/")[3];
		db.collection("products")
			.where("user", "==", uid)
			.where("sold", "==", false)
			.get()
			.then((snapshot) => {
				console.log(snapshot);
				const products = [];
				snapshot.forEach((doc) => {
					products.push({ id: doc.id, ...doc.data() });
				});
				setProducts(products);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	console.log(products);
	return (
		<div className='flex flex-wrap gap-6'>
			{products.map((p) => (
				<div style={{ minWidth: "200px" }}>
					<ProductCard product={p} />
				</div>
			))}
		</div>
	);
};

export default ForSale;
