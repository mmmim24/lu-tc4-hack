import { Button, message } from "antd";
import React from "react";
import { db } from "../firebase";
import { useStateValue } from "../state/stateprovider";

const Pricing = () => {
	const [{ user }] = useStateValue();
	const handleSubmit = async () => {
		if (parseFloat(user.deposit) - parseFloat(200) < 0) {
			message.error("Please deposit first");
			return;
		}

		await db
			.collection("users")
			.doc(user.id)
			.update({
				deposit: parseFloat(user.deposit) - parseFloat(200),
				premium: true,
			});
		message.success("Purchase Successful");
		// 	await db
		// 		.collection("users")
		// 		.doc(product.seller.id)
		// 		.collection("notifications")
		// 		.add({
		// 			title: "Sell offer Accepted by user",
		// 			message: `Your offer of selling ${product.title} at ${current_user_bid.selected_bid.bid} has been accepted by buyer`,
		// 			link: `/product/${product.id}`,
		// 			seen: false,
		// 		});
		// };
	};
	return (
		<div className='px-12'>
			<h1 className='text-3xl mb-10'>Pricing Details</h1>
			<div>
				<div>Premium Features (BDT 200 only)</div>
				<ol className='mt-2'>
					<li>- Unlimited Product Postings</li>
					<li>- Predictable Bids</li>
					<li>- Private Chat with other premium members</li>
					<li>- 24/7 Support</li>
				</ol>
			</div>
			<Button className='mt-5' onClick={() => handleSubmit()} type='primary'>
				Go Premium
			</Button>
		</div>
	);
};

export default Pricing;
