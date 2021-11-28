import React from "react";
import { Link } from "react-router-dom";
import productImg from "../../static/dokkaebi.png";

export default (props) => {
	const {
		title,
		user: seller,
		id,
		category,
		description,
		images,
		minimum_bid,
	} = props.product;

	return (
		<Link
			to={`/product/${id}`}
			className='border border-black rounded-xl shadow-xl p-4 flex flex-col hover:border-4'
		>
			<div className='w-full flex justify-center'>
				<img
					style={{ width: "200px", height: "150px", objectFit: "cover" }}
					src={images[0]}
					alt='product'
					className=' rounded-xl'
				/>
			</div>
			<div className='my-4 w-full flex flex-col justify-between'>
				<div className='text-lg my-4'>{title}</div>
				<div className='text-xs'>{seller.name}</div>
				<div className='text-xs'>{seller.address}</div>
			</div>
			<div className='text-primary mt-2 text-right'>
				Starts at <span className='font-bold'>{minimum_bid} </span> BDT
			</div>
		</Link>
	);
};
