import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const ProfileCard = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetch = async () => {
			const doc = await db
				.collection("users")
				.doc(window.location.pathname.split("/")[3])
				.get();
			setUser(doc.data());
		};
		fetch();
	}, []);
	console.log(window.location.pathname.split("/")[3]);
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
					<div>Points</div>
					<div>Sold</div>
					<div>Bought</div>
				</div>
				<div>
					<div className='font-bold text-primary'>{10}</div>
					<div className='font-bold text-primary'>{5}</div>
					<div className='font-bold text-primary'>{1}</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
