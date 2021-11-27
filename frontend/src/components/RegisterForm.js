import {
	FileProtectOutlined,
	MailOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";

const RegisterForm = ({ setUserValid }) => {
	const [username, setUsername] = React.useState();
	const [email, setEmail] = React.useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, email);
		if (!username || !email) {
			message.error("Username or Email can't be blank!");
			return;
		}
		setUserValid(true);
	};
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
			{/* <div className='flex gap-4'>
						<div>
							<label>First Name:</label>
							<Input
								onChange={(e) => setFirstName(e.target.value)}
								type='text'
							/>
						</div>
						<div>
							<label>Last Name:</label>
							<Input
								onChange={(e) => setLastName(e.target.value)}
								type='text'
							/>
						</div>
					</div> */}
			<div>
				<Input
					type='text'
					placeholder='Username'
					prefix={<UserOutlined />}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className='flex gap-3'>
				<Input
					type='email'
					placeholder='Email'
					prefix={<MailOutlined />}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className='flex justify-center'>
				<Button
					htmlType='submit'
					onClick={handleSubmit}
					icon={<FileProtectOutlined />}
					type='primary'
					className=' mt-4 w-4/12 center min-w-min'
				>
					Register
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
