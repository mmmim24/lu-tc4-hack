import { BellOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Badge } from "antd";
import React, { useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
	const [show, setShow] = React.useState(false);
	const [notices, setNotices] = React.useState([]);
	const [unread, setUnread] = React.useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		db.collection("users")
			.doc(auth.currentUser.uid)
			.collection("notifications")
			.onSnapshot((snapshot) => {
				const temp = [];
				let unreadTemp = 0;
				snapshot.forEach((doc) => {
					temp.push({ id: doc.id, ...doc.data() });
					!doc.data().seen && unreadTemp++;
				});
				setNotices(temp);
				setUnread(unreadTemp);
			});
	}, []);

	const handleClick = async (n) => {
		await db
			.collection("users")
			.doc(auth.currentUser.uid)
			.collection("notifications")
			.doc(n.id)
			.update({ seen: true });

		navigate(n.link);
	};
	return (
		<div style={{ position: "relative" }}>
			<Badge
				size='small'
				count={unread}
				color='white'
				style={{ color: "black" }}
			>
				<BellOutlined
					onClick={() => setShow(!show)}
					style={{ fontSize: "1.2rem", color: "white" }}
				/>
			</Badge>
			{show && (
				<div
					style={{
						position: "absolute",
						top: "20px",
						right: "10%",
						width: "30%",
					}}
					className='rounded flex min-w-max bg-white text-black shadow px-4 py-4 mt-3'
				>
					{notices.length > 0 ? (
						<div className='flex flex-col gap-4 scroll'>
							{notices.map((notice) => (
								<div className='cursor-pointer'>
									<div onClick={() => handleClick(notice)}>
										<div className='font-bold flex items-center gap-2'>
											{notice.title}{" "}
											{notice.seen ? null : (
												<InfoCircleTwoTone style={{ color: "#3c6e71ff" }} />
											)}
										</div>
										<div className='text-xs text-gray-400'>
											{notice.message}
										</div>
									</div>
									<hr className='mt-2' />
								</div>
							))}
						</div>
					) : (
						<div>You are all caught up!</div>
					)}
				</div>
			)}
		</div>
	);
};

export default NoticeBoard;
