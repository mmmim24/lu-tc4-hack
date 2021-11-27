import Layout from "../components/Layout";
import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Profile = () => {
	return (
		<Layout>
			<div className='flex px-12 py-4'>
				<div className='flex mt-14 flex-col bg-gray-200 rounded px-4 py-5 items-center'>
					<Avatar size={98} icon={<UserOutlined />} />
					<div className='mt-4 mb-2 text-2xl'> UserName </div>
					<div className='mt-2 text-xs mb-2'> Sylhet, Bangladesh </div>
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
			</div>
		</Layout>
	);
};

export default Profile;
