import { FileProtectOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { useStateValue } from "../state/stateprovider";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
	const [otp, setOtp] = React.useState();
	const [timer, setTimer] = React.useState(5);
	const [{ user }, action] = useStateValue();
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		action({
			type: "SET_USER",
			payload: {
				user: {
					id: 123,
					name: "xyz",
				},
			},
		});
		navigate("/home");
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
		timerInit();
	}, []);

	const handleResend = () => {
		setTimer(5);
		timerInit();
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
					onClick={handleSubmit}
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

export default OTPForm;
