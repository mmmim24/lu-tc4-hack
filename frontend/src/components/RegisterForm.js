import {
	FileProtectOutlined,
	MailOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useEffect } from "react";
import { auth, firebaseApp } from "../firebase";

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

	useEffect(() => {
		// window.recaptchaVerifier = new auth.RecaptchaVerifier("sign-in-button", {
		// 	size: "invisible",
		// 	callback: (response) => {
		// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
		// 		onSignInSubmit();
		// 	},
		// });
	}, []);

	// const handleSignIn = () => {
	// 	const phoneNumber = "+8801538832303";
	// 	const appVerifier = window.recaptchaVerifier;

	// 	auth
	// 		.signInWithPhoneNumber(phoneNumber, appVerifier)
	// 		.then((confirmationResult) => {
	// 			// SMS sent. Prompt user to type the code from the message, then sign the
	// 			// user in with confirmationResult.confirm(code).
	// 			window.confirmationResult = confirmationResult;
	// 			console.log(confirmationResult);
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			// Error; SMS not sent
	// 			// ...
	// 		});
	// };

	// useEffect(() => {
	// 	window.recaptchaVerifier = new auth.RecaptchaVerifier("sign-in-button", {
	// 		size: "invisible",
	// 		callback: (response) => {
	// 			// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 			handleSignIn();
	// 		},
	// 	});
	// }, []);
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
					id='submit-form'
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
