import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Avatar, Select, message } from "antd";
import { auth, db } from "../firebase";
import { useStateValue } from "../state/stateprovider";
import { UserOutlined } from "@ant-design/icons";

const divs = [
	"Barishal",
	"Chittagong",
	"Dhaka",
	"Mymensingh",
	"Khulna",
	"Rajshahi",
	"Rangpur",
	"Sylhet",
];

const { Option } = Select;

const ProfileSettings = () => {
	const [values, setvalues] = useState({});
	const [{ user }] = useStateValue();

	useEffect(() => {
		db.collection("users")
			.doc(user.id)
			.onSnapshot((doc) => {
				console.log(doc.data());
				// form.setFieldsValue(doc.data());
				setvalues(doc.data());
			});
	}, []);

	const handleChange = (change) => {
		setvalues({ ...values, ...change });
	};

	const handleForm = () => {
		console.log("hi");
	};

	console.log(values);
	const handleSubmit = () => {
		db.collection("users")
			.doc(user.id)
			.update(values)
			.then(() => {
				message.success("Profile Updated");
				console.log("updated");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='px-12'>
			<h1 className='text-3xl mb-10'>Update your profile</h1>
			<div className='flex justify-between gap-8'>
				<div style={{ flex: "0.45" }} className='flex flex-col gap-4'>
					<div>
						<label> Full Name </label>
						<Input
							onChange={(e) => handleChange({ name: e.target.value })}
							value={values?.name}
							type='text'
						/>
					</div>
					<div>
						<label> Phone Number </label>
						<Input
							value={values?.phone}
							placeholder={auth.currentUser?.phoneNumber}
							disabled
							type='number'
						/>{" "}
					</div>
					<div>
						<label> City</label>
						<div>
							<Select
								onChange={(e) => handleChange({ city: e })}
								value={values?.city}
								placeholder='Select City'
								style={{ width: "100%" }}
							>
								{divs.map((div) => (
									<Option value={div}>{div}</Option>
								))}
							</Select>
						</div>
					</div>
					<div>
						<label>Street Address </label>
						<Input
							onChange={(e) => handleChange({ address: e.target.value })}
							value={values?.address}
							type='text'
						/>
					</div>
					<Button onClick={handleSubmit} type='primary'>
						Save Changes
					</Button>
				</div>
				<div style={{ flex: 0.5, marginRight: "200px" }}>
					<div className='flex flex-col gap-2 items-center'>
						<Avatar icon={<UserOutlined />} size={100} src={user.photoURL} />
						<div className='tc'>
							{values?.verified ? "Verified" : "Not verified"}
						</div>
						<div className='mt-8 rounded border-black border px-8 py-2'>
							{values?.premium ? "Premium" : "Free Plan"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSettings;
