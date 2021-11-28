import {
	FacebookOutlined,
	InstagramOutlined,
	TwitterOutlined,
	UserOutlined,
	YoutubeOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
import { Navigate } from "react-router";
import { auth } from "../firebase";
import { useStateValue } from "../state/stateprovider";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/deal-logo-white.png";
import NoticeBoard from "./NoticeBoard";

const Layout = ({ children }) => {
	const [{ user }, action] = useStateValue();
	const [show, setShow] = React.useState(false);
	const navigate = useNavigate();

	const handleSignOut = () => {
		auth.signOut();
		action({
			type: "SET_USER",
			payload: {
				user: null,
			},
		});
		// Navigate("/register");
	};
	return (
		<div>
			<div className='bg-primary'>
				<div className='px-12 py-2 flex items-center justify-between text-white'>
					<div>
						<img
							onClick={() => navigate("/home")}
							src={logo}
							alt='deal.com'
							height='70px'
							width='70px'
							className='cursor-pointer'
						/>
					</div>
					<div className='flex items-center gap-12'>
						<Link to='/home'>Home</Link>
						{/* <div>Categories</div> */}
						<Button type='primary' onClick={() => navigate("/product/add")}>
							Post a Deal
						</Button>
						<div>
							<NoticeBoard />
						</div>
						<Avatar
							className='cursor-pointer'
							onClick={() => setShow(!show)}
							icon={<UserOutlined />}
						/>

						<div
							className={`${
								show ? "flex" : "hidden"
							} flex-col gap-2 bg-white text-black shadow px-8 py-4 border-1 rounded profile_nav`}
						>
							<div className='text-primary text-xs'>
								<span className='text-xl'>
									{parseFloat(user?.deposit).toFixed(2)}
								</span>{" "}
								BDT
							</div>
							<div
								className='cursor-pointer'
								onClick={() => navigate("/profile/settings")}
							>
								Profile
							</div>
							<hr />
							<div
								className='cursor-pointer'
								onClick={() => navigate("/profile/settings")}
							>
								Deposit
							</div>
							<hr />
							<div className='cursor-pointer' onClick={handleSignOut}>
								Sign Out
							</div>
							{/* <div onClick={handleSignOut}>Sign Out</div> */}
						</div>
					</div>
				</div>
			</div>
			<div className='min-h-screen'>{children}</div>
			<div className='bg-primary text-gray-300 flex justify-between items-center px-6 py-3'>
				<div className='flex gap-12'>
					<div>
						<div>Contact: +8809611443452</div> <br />
						<div>Address: 106, Lake City, Street 6</div>
					</div>
					<div>
						<div>Email: headquarter@deal.com</div>
						<br />
						<div className='flex items-center gap-2'>
							Follow us: <FacebookOutlined style={{ fontSize: "1.5rem" }} />{" "}
							<TwitterOutlined style={{ fontSize: "1.5rem" }} />{" "}
							<InstagramOutlined style={{ fontSize: "1.5rem" }} />{" "}
							<YoutubeOutlined style={{ fontSize: "1.5rem" }} />{" "}
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					<div>
						<img src={logo} alt='deal.com' height='35px' width='35px' />
					</div>
					{/* <div>DEAL.com</div> */}
					<div className='text-xs text-gray-400'>
						Founded in 2021, deal.com aim to be No.1 <br />
						trusted site for buying and selling brand new/used <br /> products
						in the country.
					</div>
					<div>2021-deal.com</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
