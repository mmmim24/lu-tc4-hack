import { Button, Input, message, Select } from "antd";
import {
	FileProtectOutlined,
	MobileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import React from "react";
import RegisterForm from "../components/RegisterForm";
import OTPForm from "../components/OTPForm";

const Register = () => {
	const [userValid, setUserValid] = React.useState(false);
	const [otpValid, setOtpValid] = React.useState(false);
    
	return (
		<div className='bg-gray flex flex-col min-w-screen min-h-screen justify-center items-center'>
			<div className='flex bg-white min-w-content flex-col items-center shadow w-3/12 border-t border-l border-black rounded py-8 px-6'>
				<h2 className='text-3xl font-bold mb-8'>Deal.com</h2>
				<div>
					<h2 className='text-xl text-primary'>Sign up</h2>
					<p className='text-gray-300 mb-8 text-xs'>
						Don't have an account? Create your account, it takes less than a
						minute
					</p>
				</div>
				{!userValid ? (
					<RegisterForm setUserValid={setUserValid} />
				) : (
					<OTPForm />
				)}
				<p className='mt-5 text-xs'>
					Already Have an account?{" "}
					<span className='underline cursor-pointer'>Sign In </span>
				</p>
			</div>
		</div>
	);
};

export default Register;
