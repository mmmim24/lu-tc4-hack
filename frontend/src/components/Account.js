import { DollarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useStateValue } from "../state/stateprovider";

const Account = () => {
	const [{ user }] = useStateValue();
	return (
		<div className='px-12'>
			<h1 className='text-3xl mb-10'>Manage Account</h1>
			<div>Current Balance: {parseFloat(user.deposit).toFixed(2)} BDT</div>
			<Button className='mt-5 center' icon={<DollarOutlined />} type='primary'>
				Deposit
			</Button>
		</div>
	);
};

export default Account;
