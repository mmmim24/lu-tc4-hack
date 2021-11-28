import Layout from "../components/Layout";
import Product from "../components/products/product";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { functions } from "../firebase";

const Home = () => {
	const [allProducts, setAllProducts] = React.useState([]);
	const [products, setProducts] = React.useState([]);
	const [search, setSearch] = React.useState();

	const fetchProducts = async () => {};

	useEffect(async () => {
		const productsSnap = await db
			.collection("products")
			.where("sold", "==", false)
			.get();
		const productsArray = await Promise.all(
			productsSnap.docs.map(async (doc) => {
				const product = doc.data();
				const uid = product.user;
				const user = await db.collection("users").doc(uid).get();
				return {
					id: doc.id,
					...product,
					user: user.data(),
				};
			})
		);
		setAllProducts(productsArray);
		setProducts(productsArray);
		console.log(productsArray);
	}, []);
    useEffect( async () => {
        const productsSnap = await db.collection("products").get()
        const productsArray = await Promise.all(productsSnap.docs.map( async doc => {
            const product = doc.data()
            const uid = product.user;
            const user = await db.collection("users").doc(uid).get()
            return {
                id: doc.id,
                ...product,
                user: user.data()
            }
        }))
        setProducts(productsArray)

        functions.getGatewayURL();

        console.log(productsArray)
    }, [] )

	const handleSearch = (e) => {
		e.preventDefault();
		if (!search) setProducts(allProducts);
		const filtered = [];
		allProducts.forEach((product) => {
			if (product.title.toLowerCase().includes(search.toLowerCase())) {
				filtered.push(product);
			}
		});
		setProducts(filtered);
	};
	return (
		<Layout>
			<div className='mt-3 flex justify-center w-full'>
				<form
					onSubmit={handleSearch}
					className='rounded-full flex items-center border px-5 py-1'
				>
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						type='text'
						className='rounded-full border-none focus:shadow-none'
						placeholder='Search any product'
					/>
					<SearchOutlined
						onClick={handleSearch}
						style={{ fontSize: "1.2rem" }}
					/>
				</form>
			</div>
			<div className='grid grid-cols-4 p-16'>
				{products.map((product) => {
					return (
						<div className='col-span-1 p-4'>
							<Product key={product} product={product} />
						</div>
					);
				})}
			</div>
		</Layout>
	);
};

export default Home;
