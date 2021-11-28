import Layout from "../components/Layout";
import Product from "../components/products/product";
import React, { useEffect } from "react";
import productImg from "../static/dokkaebi.png";
import { Carousel } from "antd";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateValue } from "../state/stateprovider";
import Bids from "../components/product/bids";

const Home = () => {
	const userId = useStateValue()[0].user.uid;
	const { id } = useParams();
	const [product, setProduct] = React.useState({});
	const [bids, setBids] = React.useState([]);

	// sort by highest bid
	// sort by rating ( including negative rating )
	// if consecutive reviews all negative suspend user
	// user can drop the product at our warehouse or request us to collect it from  him/her
	// fremium user posts will expire within 5days premium users posts will expire within 1 year

	useEffect(async () => {
		const productSnap = await db.collection("products").doc(id).get();
		const product = productSnap.data();
		console.log(productSnap.id);
		setProduct({
			id: productSnap.id,
			...product,
			seller: (await db.collection("users").doc(product.user).get()).data(),
		});

		db.collection("products")
			.doc(id)
			.onSnapshot(async (snap) => {
				setProduct({
					id: snap.id,
					...snap.data(),
					seller: (
						await db.collection("users").doc(snap.data().user).get()
					).data(),
				});
			});
	}, []);

	return (
		<Layout>
			{product.id ? (
				<div className='grid grid-cols-4 p-8'>
					<div className='col-span-3'>
						<div className='w-full  flex justify-center'>
							<img
								src={product.images[0]}
								style={{ maxHeight: "20rem" }}
								alt='product'
								className=' rounded-xl'
							/>
						</div>
						<div className=''>
							<Bids product={product} />
						</div>
					</div>
					<div className='col-span-1 flex flex-col  border border-gray rounded py-4 px-4'>
						<div className=''>
							<div className='text-2xl'>Product Title</div>
							<div className=' mt-4 text-xl mb-4 text-primary'>
								{" "}
								{product?.title}{" "}
							</div>
						</div>
						<hr />
						<div className='mt-2'>
							<div className='text-xl'>Description</div>
							<div className=' mt-4 mb-4 text-primary'>
								{" "}
								{product?.description}{" "}
							</div>
							<div>
								By{" "}
								<Link to={`/profile/view/${product.seller.id}`}>
									{" "}
									{product.seller.name}{" "}
								</Link>
							</div>
							<div>Address: {product.seller.address} </div>
						</div>
					</div>
				</div>
			) : (
				<LoadingOutlined />
			)}
		</Layout>
	);
};

export default Home;
