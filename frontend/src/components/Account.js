import { DollarOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { useStateValue } from "../state/stateprovider";

const Account = () => {
	const [amount, setAmount] = React.useState();
	const [tran_id, setTran_id] = React.useState(-1);
	const [{ user }, action] = useStateValue();

	useEffect( () => {
		if(tran_id == -1) return;
		console.log(tran_id)
		// db.collection("transactions").doc(tran_id.toString()).get().then( v => { console.log(v.data()) })
		db.collection("transactions").doc(tran_id.toString()).onSnapshot( async snap=> {
			console.log(snap.data());
			console.log("gg");
			const data = snap.data();
			console.log(data);
			if( data.status == "success" ) {
				message.success("Transaction Successful");
				await db.collection("users").doc(user?.id).update({
					deposit: parseFloat(user?.deposit) + parseFloat(amount),
				})
				action({
					type: "SET_USER",
					payload: {
						user: {
							...user,
							deposit: parseFloat(user?.deposit) + parseFloat(amount),
						},
					},
				});
				setAmount(0);
			}
		} )
	},[tran_id] )

	const handleDeposit = async () => {
		if (!amount) return;
		const td = await fetch("http://localhost:5003/practice-management-system/us-central1/api3/init")
        const data = await td.json();
		console.log(data);
		setTran_id(data.tran_id);
		window.open(data.GatewayPageURL, '_blank');
		setAmount(0)
		// message.success("Deposit Successful");
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
