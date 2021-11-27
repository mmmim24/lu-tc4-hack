import { BellOutlined, SoundOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";

const NoticeBoard = () => {
	const [show, setShow] = React.useState(false);
	const [notices, setNotices] = React.useState([]);

	useEffect(() => {
		db.collection("users")
			.doc(auth.currentUser.uid)
			.collection("notifications")
			.onSnapshot((snapshot) => {
				const temp = [];
				snapshot.forEach((doc) => {
					temp.push(doc.data());
				});
				setNotices(temp);
			});
	}, []);
	return (
		<div style={{ position: "relative" }}>
			<BellOutlined
				onClick={() => setShow(!show)}
				style={{ fontSize: "1.2rem" }}
			/>
			{show && (
				<div
					style={{ position: "absolute", top: "20px", right: "10%" }}
					className='flex min-w-max bg-white text-black shadow px-4 py-4 mt-3'
				>
					{notices.length > 0 ? (
						<div>
							{notices.map((notice) => (
								<div className='border-b'>
									<Link to={notice.link}>
										<div>{notice.title}</div>
										<div>{notice.description}</div>
									</Link>
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
