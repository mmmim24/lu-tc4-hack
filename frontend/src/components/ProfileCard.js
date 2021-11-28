import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Slider } from "antd";
import TextArea from "rc-textarea";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useStateValue } from "../state/stateprovider";

const ProfileCard = () => {
	const [user, setUser] = useState(null);
	const [isValid, setIsValid] = useState(false);
	const [{ user: currentUser }] = useStateValue();
	useEffect(() => {
		const fetch = async () => {
			const doc = await db
				.collection("users")
				.doc(window.location.pathname.split("/")[3])
				.get();
			const reviewSnaps = await db
				.collection("users")
				.doc(window.location.pathname.split("/")[3])
				.collection("reviews")
				.get();
			const rating = reviewSnaps.docs.reduce((prev_total, snap) => {
				return prev_total + parseInt(snap.data().rating);
			}, 0);

			console.log("rating ", rating);

			setUser({
				...doc.data(),
				rating: rating,
			});
		};
		fetch();
	}, []);
	console.log(window.location.pathname.split("/")[3]);

	const [reviewState, setReviewState] = useState({});
	const handleReview = async () => {
		// console.log(reviewState);
		await db
			.collection("users")
			.doc(user.id)
			.collection("reviews")
			.doc(currentUser.id)
			.set({
				...reviewState,
				user: currentUser,
			});
	};

	useEffect(() => {
		if (!currentUser || !user) return;
		const checkValidity = async () => {
			db.collection("orders")
				.where("sellerId", "==", user.id)
				.where("buyerId", "==", currentUser.id)
				.get()
				.then((snap) => {
					if (snap.empty) {
						setIsValid(false);
					} else {
						setIsValid(true);
					}
				});
		};
		currentUser.id !== user.id && checkValidity();
	}, [user, currentUser]);

	return (
		<div className='flex mt-14 flex-col bg-gray-200 rounded px-4 py-5 items-center'>
			<Avatar size={98} icon={<UserOutlined />} />
			<div className='mt-4 mb-2 text-2xl'> {user?.name} </div>
			<div className='mt-2 text-xs mb-2'> {user?.address} </div>
			<div
				style={{
					maxWidth: "200px",
					fontSize: "0.6rem",
					textAlign: "center",
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</div>
			<div className='flex gap-2 mt-5 mb-7'>
				<Button type='primary' shape='round'>
					Favourites
				</Button>
				<Button type='primary' shape='round'>
					Message
				</Button>
			</div>

			<div className='flex gap-5'>
				<div className='text-right'>
					<div>Rating</div>
					<div>Sold</div>
					<div>Bought</div>
				</div>
				<div>
					<div className='font-bold text-primary'>{user?.rating}</div>
					<div className='font-bold text-primary'>{5}</div>
					<div className='font-bold text-primary'>{1}</div>
				</div>
			</div>
			{isValid && (
				<div>
					<div className='flex justify-center flex-col w-full px-6 mt-6'>
						<div className='text-xl mt-5 text-center'>Review Section</div>
						<div>
							<Slider
								defaultValue={0}
								min={-5}
								max={5}
								onAfterChange={(rating) =>
									setReviewState({
										...reviewState,
										rating,
									})
								}
							/>
						</div>
						<div className='text-xs mt-5'>
							<TextArea
								onBlur={(e) =>
									setReviewState({
										...reviewState,
										review: e.target.value,
									})
								}
								className='rounded-lg p-4'
								placeholder='Add a review'
								rows={4}
							/>
						</div>
						<Button
							onClick={handleReview}
							className=''
							type='primary'
							shape='round'
							className='mt-5'
						>
							Submit
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
