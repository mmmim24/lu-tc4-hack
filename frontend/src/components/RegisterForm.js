import {
	FileProtectOutlined,
	MailOutlined,
	MobileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Select, Button, Input, message } from "antd";
import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../state/stateprovider";
import { useNavigate } from "react-router";

const RegisterForm = ({ setUserValid }) => {
	const [codeSent, setCodeSent] = React.useState();
	const [phone, setPhone] = React.useState();
	const [otp, setOtp] = React.useState();
	const [timer, setTimer] = React.useState(90);
	const [, action] = useStateValue();
	const navigate = useNavigate();

	const { Option } = Select;

	const handleSignIn = (e) => {
		e.preventDefault();
		if (!phone || phone.length < 10) return;
		const phoneNumber = "+880" + phone;
		const appVerifier = window.recaptchaVerifier;
		console.log("Running handleSignIn");
		auth
			.signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				console.log(confirmationResult);
				setCodeSent(true);
				// ...
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
				console.log(error);
			});
	};

	useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"submit-form",
			{
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					handleSignIn();
				},
			}
		);
	}, []);

	const handleConfirm = (e) => {
		e.preventDefault();
		if (!otp) return;
		window.confirmationResult
			.confirm(otp)
			.then((result) => {
				// User signed in successfully.
				const user = result.user;

				db.collection("users")
					.doc(user.uid)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							message.success("Welcome back!");
							action({
								type: "SET_USER",
								payload: {
									user: user,
								},
							});
							navigate("/home");
						} else {
							const data = {
								id: user.uid,
								name: user.displayName,
								points: 0,
								verified: false,
								deposit: 0,
								suspended: false,
								avatar: null,
								address: null,
								city: null,
								premium: false,
							};
							db.collection("users")
								.doc(user.uid)
								.set(data)
								.then(() => {
									message.success("Successfully registered");
									action({
										type: "SET_USER",
										payload: {
											user: user,
										},
									});
									navigate("/home");
								})
								.catch((error) => {
									console.log(error);
									message.error("Something went wrong");
								});
						}
					})
					.catch((error) => {
						console.log("error");
					});
				console.log(user);
				// ...
			})
			.catch((error) => {
				// User couldn't sign in (bad verification code?)
				// ...
				console.log(error);
				message.error("Something went wrong");
			});
	};

	const timerInit = () => {
		const tm = setInterval(() => {
			setTimer((prev) => {
				console.log("beep");
				if (prev) return prev - 1;
				else clearInterval(tm);
			});
		}, 1000);
	};

	useEffect(() => {
		codeSent && timerInit();
	}, [codeSent]);

	const handleResend = () => {
		setTimer(90);
		timerInit();
	};

	return !codeSent ? (
		<form onSubmit={handleSignIn} className='flex flex-col gap-3'>
			<div>
				<div className='flex gap-3'>
					<Select showArrow={false} value='+880' disabled={true}>
						<Option value='+880'>+880</Option>
					</Select>
					<Input
						prefix={<MobileOutlined />}
						onChange={(e) => setPhone(e.target.value)}
						type='number'
						placeholder='Enter your number'
					/>
				</div>
			</div>
			<div className='flex justify-center'>
				<Button
					id='submit-form'
					htmlType='submit'
					onClick={handleSignIn}
					icon={<FileProtectOutlined />}
					type='primary'
					className=' mt-4 w-4/12 center min-w-min'
				>
					Register
				</Button>
			</div>
		</form>
	) : (
		<form onSubmit={handleConfirm} className='flex flex-col gap-3'>
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
					type='number'
					placeholder='Enter OTP'
					// prefix={<UserOutlined />}
					onChange={(e) => setOtp(e.target.value)}
				/>
			</div>

			<div className='text-xs text-center'>
				{timer ? (
					`Resend in ${timer} seconds`
				) : (
					<span onClick={() => handleResend()}>Resend Now</span>
				)}
			</div>
			<div className='flex justify-center'>
				<Button
					htmlType='submit'
					onClick={handleConfirm}
					icon={<FileProtectOutlined />}
					type='primary'
					className='mt-4 w-4/12 min-w-min center'
				>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
