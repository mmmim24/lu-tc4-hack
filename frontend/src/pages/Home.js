import Layout from "../components/Layout";
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!auth.currentUser.displayName) {
			notification.open({
				message: "Let's Complete your profile",
				icon: <SmileOutlined />,
				description: "Fill out your complete profile to stand out.",
				onClick: () => {
					navigate("/profile/settings");
				},
			});
		}
	}, []);
	return <Layout>HI</Layout>;
};

export default Home;
