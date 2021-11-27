import Layout from "../components/Layout";
import React from "react";
import ProfileCard from "../components/ProfileCard";
import { Tabs } from "antd";
import ForSale from "../components/ForSale";
import Sold from "../components/Sold";

const { TabPane } = Tabs;

const Profile = () => {
	return (
		<Layout>
			<div className='flex px-12 py-4'>
				<ProfileCard />
				<div className='w-full m-10 ml-14'>
					<Tabs defaultActiveKey='1'>
						<TabPane tab='For Sale' key='1'>
							<ForSale />
						</TabPane>
						<TabPane tab='Sold' key='2'>
							<Sold />
						</TabPane>
						{/* <TabPane tab='Tab 3' key='3'>
						Content of Tab Pane 3
					</TabPane> */}
					</Tabs>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
