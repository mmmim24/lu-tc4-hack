import { DollarOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { db } from "../firebase";
import { useStateValue } from "../state/stateprovider";

const Account = () => {
	const [amount, setAmount] = React.useState();
	const [{ user }] = useStateValue();
	const handleDeposit = async () => {
		if (!amount) return;
		await db.collection("users").doc(user?.id).update({
			deposit: parseFloat(user?.deposit) + parseFloat(amount),
		})
		setAmount()
		message.success("Deposit Successful");
	}
	return (
		<div className='px-12'>
			<h1 className='text-3xl mb-10'>Manage Account</h1>
			<div>Current Balance: {parseFloat(user.deposit).toFixed(2)} BDT</div>
			<div >
				<Input value = {amount} onChange={e => setAmount(e.target.value)} className="w-1/4 mt-4 flex" type = "number" placeholder="Enter Amount" />
			</div>
			<Button onClick={ handleDeposit} className='mt-5 center' icon={<DollarOutlined />} type='primary'>
				Deposit
			</Button>
		</div>
	);
};

export default Account;
