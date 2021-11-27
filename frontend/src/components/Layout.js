import {
	FacebookOutlined,
	InstagramOutlined,
	TwitterOutlined,
	YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";

const Layout = ({ children }) => {
	return (
		<div>
			<div className='bg-primary'>
				<div className='px-12 py-2 flex items-center justify-between text-white'>
					<div>
						<div>DEAL</div>
						<div>.COM</div>
					</div>
					<div className='flex gap-12'>
						<div>Home</div>
						<div>Categories</div>
						<div>Best Deals</div>
						<div>Profile</div>
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
					<div>DEAL.com</div>
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
