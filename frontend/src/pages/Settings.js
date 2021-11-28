import { Tabs } from "antd";
import React from "react";
import Account from "../components/Account";
import Layout from "../components/Layout";
import Pricing from "../components/Pricing";
import ProfileSettings from "../components/ProfileSettings";
import Verification from "../components/Verification";

const { TabPane } = Tabs;

const Settings = () => {
	return (
		<Layout>
			<div>
				<div className='ml-12 mt-10'>
					<Tabs tabPosition='left' defaultActiveKey='1'>
						<TabPane tab='Profile' key='1'>
							<ProfileSettings />
						</TabPane>
						<TabPane tab='Verification' key='2'>
							<Verification />
						</TabPane>
						<TabPane tab='Account' key='3'>
							{/* <Sold /> */}
							<Account />
						</TabPane>
						<TabPane tab='Pricing' key='4'>
  							<Pricing />
						</TabPane>
						<TabPane tab='Orders' key='5'>
							{/* <Sold /> */}
						</TabPane>
						<TabPane tab='Payment History' key='6'>
							{/* <Sold /> */}
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

export default Settings;
