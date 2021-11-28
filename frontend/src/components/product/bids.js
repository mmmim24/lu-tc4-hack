import { Button, Input, message, Table, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../state/stateprovider";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

const { Column } = Table;

export default (props) => {
	const product = props.product;
	const userId = auth.currentUser.uid;
	const [bids, setBids] = React.useState([]);
	const [current_user_bid, set_current_user_bid] = useState({
		selected_bid: {
			bid: -1,
		},
		accepted: false,
	});
	const [current_user_owner, set_current_user_owner] = useState(false);
	const [{ user }] = useStateValue();
	const [lowRange, setLowRange] = useState();
	const [highRange, setHighRange] = useState();

	useEffect(async () => {
		if (product.seller.id == userId) {
			set_current_user_owner(true);
			const bidsSnap = await db
				.collection("products")
				.doc(product.id)
				.collection("bids")
				.orderBy("bid", "desc")
				.get();
			const bids = await Promise.all(
				bidsSnap.docs.map(async (doc) => ({
					...doc.data(),
					username: (
						await db.collection("users").doc(doc.data().user).get()
					).data().name,
				}))
			);
			setBids(bids);
		} else {
			// if( product.is_bidding_off )
			//     return;
			const selected_bid_snap = await db
				.collection("products")
				.doc(product.id)
				.collection("bids")
				.where("user", "==", userId)
				.get();
			if (selected_bid_snap.docs.length == 0) return;
			const selected_bid = selected_bid_snap.docs[0].data();
			console.log(selected_bid);
			set_current_user_bid({
				selected_bid: selected_bid,
			});
			if (
				product.accepted_bid_id &&
				selected_bid.id == product.accepted_bid_id
			) {
				set_current_user_bid({
					selected_bid: selected_bid,
					accepted: true,
				});
			}
		}
	}, []);

	const acceptOffer = async () => {
		if (
			parseFloat(user.deposit) - parseFloat(current_user_bid.selected_bid.bid) <
			0
		) {
			message.error("You don't have enough money to accept this offer");
			return;
		}

		await db
			.collection("users")
			.doc(user.id)
			.update({
				deposit:
					parseFloat(user.deposit) -
					parseFloat(current_user_bid.selected_bid.bid),
			});
		console.log(current_user_bid.selected_bid.bid);
		message.success("Purchase Successful");
		await db
			.collection("users")
			.doc(product.seller.id)
			.collection("notifications")
			.add({
				title: "Sell offer Accepted by user",
				message: `Your offer of selling ${product.title} at ${current_user_bid.selected_bid.bid} has been accepted by buyer`,
				link: `/product/${product.id}`,
				seen: false,
			});
	};

	const acceptBid = async (bidId) => {
		await db
			.collection("products")
			.doc(product.id)
			.set({
				...product,
				is_bidding_off: true,
				accepted_bid_id: bidId,
			});

		await db
			.collection("users")
			.doc(bids.find((bid) => bid.id == bidId).user)
			.collection("notifications")
			.add({
				title: "Bid Accepted",
				message: `Your bid of ${bids.find((bid) => bid.id == bidId).bid} on ${
					product.title
				} has been accepted`,
				link: `/product/${product.id}`,
				seen: false,
			});
	};

	const turn_on_bidding = async () => {
		if (product.accepted_bid_id) {
			await db
				.collection("users")
				.doc(bids.find((bid) => bid.id == product.accepted_bid_id).user)
				.collection("notifications")
				.add({
					title: "Bid rejected",
					message: `Your bid of ${
						bids.find((bid) => bid.id == product.accepted_bid_id).bid
					} on ${product.title} has been rejected`,
					link: `/product/${product.id}`,
					seen: false,
				});
		}

		await db
			.collection("products")
			.doc(product.id)
			.set({
				...product,
				is_bidding_off: false,
				accepted_bid_id: null,
			});
	};

	const turn_off_bidding = async () => {
		await db
			.collection("products")
			.doc(product.id)
			.set({
				...product,
				is_bidding_off: true,
				accepted_bid_id: null,
			});
	};

	const handleSubmit = async (e) => {
		if (current_user_bid.selected_bid.bid == -1) return;

		if (!current_user_bid.selected_bid.id) {
			const bid = await db
				.collection("products")
				.doc(product.id)
				.collection("bids")
				.add(current_user_bid.selected_bid);
			console.log(bid.id);
			set_current_user_bid({
				...current_user_bid,
				selected_bid: {
					...current_user_bid.selected_bid,
					id: bid.id,
				},
			});
			message.success("Bid Updated");
		} else {
			await db
				.collection("products")
				.doc(product.id)
				.collection("bids")
				.doc(current_user_bid.selected_bid.id)
				.update(current_user_bid.selected_bid);

			message.success("Bid Added");
		}
	};

	useEffect(() => {
		console.log(bids);
	}, [bids]);

	useEffect(() => {
		const fetchAll = async () => {
			if (user?.premium) {
				const bidsSnap = await db
					.collection("products")
					.doc(product.id)
					.collection("bids")
					.orderBy("bid", "desc")
					.limit(1)
					.get();

				let high = 0;
				bidsSnap.docs.map((doc) => (high += parseFloat(doc.data().bid)));
				let lowRange = high - Math.random() * (high - high / 20);
				let highRange = high + parseInt(Math.random() * (high + high / 20));
				setLowRange(parseInt(lowRange));
				setHighRange(parseInt(highRange));
			}
		};
		fetchAll();
	}, [user]);

	return current_user_bid.accepted ? (
		<Button className="mt-8" onClick={acceptOffer}>
			{" "}
			Buy Now for {current_user_bid.selected_bid.bid}{" "}
		</Button>
	) : props.product.is_bidding_off ? (
		<div className='flex mt-4 items-center justify-center flex-col gap-5'>
			<div> Bidding is currently closed for this product </div>
			<br />
			{current_user_owner ? (
				<Button type='primary' onClick={turn_on_bidding}>
					{" "}
					Turn on bidding{" "}
				</Button>
			) : (
				<></>
			)}
		</div>
	) : current_user_owner ? (
		<div className='flex mt-8 flex-col items-center justify-center'>
			<Button
				type='danger'
				className='rounded-full my-4 py-1 w-1/4'
				onClick={turn_off_bidding}
			>
				Turn off bidding
			</Button>
			<Table className='w-full' dataSource={bids}>
				<Column
					title='Name'
					dataIndex={"username"}
					key='name'
					render={(d, record) => (
						<Link to={`/profile/view/${record.user}`}>{d}</Link>
					)}
				/>
				<Column title='Bid' dataIndex={"bid"} key='bid' />
				<Column
					title='Actions'
					render={(_, record) => {
						return (
							<Button
								className='rounded'
								type='primary'
								onClick={() => acceptBid(record.id)}
							>
								Accept
							</Button>
						);
					}}
				/>
			</Table>
		</div>
	) : (
		<div className='flex mt-8 flex-col justify-center items-center gap-5'>
			<div>
				{ current_user_bid.selected_bid.bid != -1
				&& <h1> your current bid is { current_user_bid.selected_bid.bid } </h1>}
				{current_user_bid.selected_bid.bid == -1 ? "Submit" : "Re-Submit"} your
				bid. minimum bid is { product.minimum_bid }
			</div>
			{user?.premium && lowRange && highRange && (
				<div className='flex p-2 rounded gap-2 bg-primary text-white items-center'>
					<StarOutlined />
					<div>
						<span className='font-bold '>
							{lowRange} - {highRange}
						</span>{" "}
						BDT has a higher probability to win
					</div>
					<StarOutlined />
				</div>
			)}
			<Input
				className='w-1/4'
				type='number'
				onChange={(e) => {
					set_current_user_bid({
						...current_user_bid,
						selected_bid: {
							...current_user_bid.selected_bid,
							user: userId,
							time: new Date(),
							bid: e.target.value,
						},
					});
				}}
			/>
			<Button onClick={handleSubmit} type='primary'>
				Confirm
			</Button>
		</div>
	);
};
