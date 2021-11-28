import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Progress, Upload } from "antd";
import React, { useEffect } from "react";
import firebase from "firebase";
import { auth, db, storage } from "../firebase";

const Verification = () => {
	const [userData, setUserData] = React.useState();
	const [uploadState, setUploadState] = React.useState({
		UploadStart: false,
		uploadProgress: 0,
		uploadError: false,
		uploadFileUrl: "",
	});
	const [uploadState2, setUploadState2] = React.useState({
		UploadStart: false,
		uploadProgress: 0,
		uploadError: false,
		uploadFileUrl: "",
	});

	const [fileList, setFileList] = React.useState([]);

	const handleVerify = async () => {
		const verificationRef = db.collection("users").doc(auth.currentUser.uid);

		try {
			await verificationRef.update({
				verified: true,
				verification_images: fileList.map((file) => file.url),
			});
			message.success("Verification successful");
		} catch (error) {
			message.error("Verification failed");
		}
	};

	useEffect(() => {
		db.collection("users")
			.doc(auth.currentUser.uid)
			.onSnapshot((doc) => {
				setUserData(doc.data());
			});
	}, []);

	return (
		<div className='px-12'>
			<h1 className='text-3xl mb-10'>Verification Center</h1>
			<div>
				<span>Status:</span>{" "}
				{userData?.verified ? (
					<span className='text-primary'>Verified</span>
				) : (
					<span className='text-red-500'>Not Verified</span>
				)}
			</div>
			<div className='flex gap-4 mt-5'>
				<Upload
					name='file'
					fileList={fileList}
					// eslint-disable-next-line no-undef
					customRequest={(data) => {
						const ref = storage
							.ref("nid")
							.child(`front-${auth.currentUser.uid}`);

						const task = ref.put(data.file);
						task.on(
							firebase.storage.TaskEvent.STATE_CHANGED,
							(snapshot) => {
								const progress = Math.round(
									(100 * snapshot.bytesTransferred) / snapshot.totalBytes
								);
								setUploadState({
									uploadError: false,
									uploadStart: true,
									uploadProgress: progress,
								});
							},
							(error) => {
								// Handle error during the upload
								console.log(error);
								setUploadState({
									uploadStart: false,
									uploadError: error,
								});
							},
							() => {
								task.snapshot.ref.getDownloadURL().then((downloadURL) => {
									setUploadState({
										uploadFileUrl: downloadURL,
										UploadSuccess: true,
										uploadStart: false,
									});
									console.log(downloadURL);
									setFileList([
										...fileList,
										{
											uid: fileList.length + 1,
											name: "Image " + (fileList.length + 1),
											status: "done",
											url: downloadURL,
											thumbUrl: downloadURL,
										},
									]);
									console.log(fileList);
								});
							}
						);
					}}
				>
					<Button className='center' icon={<UploadOutlined />}>
						Front Part
					</Button>
					{(uploadState.uploadStart || uploadState.UploadSuccess) && (
						<Progress type='line' percent={uploadState.uploadProgress} />
					)}
					{uploadState.uploadError && message.error("an error occured")}
				</Upload>
				<Upload
					name='file'
					fileList={fileList}
					// eslint-disable-next-line no-undef
					customRequest={(data) => {
						const ref = storage
							.ref("nid")
							.child(`back-${auth.currentUser.uid}`);

						const task = ref.put(data.file);
						task.on(
							firebase.storage.TaskEvent.STATE_CHANGED,
							(snapshot) => {
								const progress = Math.round(
									(100 * snapshot.bytesTransferred) / snapshot.totalBytes
								);
								setUploadState2({
									uploadError: false,
									uploadStart: true,
									uploadProgress: progress,
								});
							},
							(error) => {
								// Handle error during the upload
								console.log(error);
								setUploadState2({
									uploadStart: false,
									uploadError: error,
								});
							},
							() => {
								task.snapshot.ref.getDownloadURL().then((downloadURL) => {
									setUploadState2({
										uploadFileUrl: downloadURL,
										UploadSuccess: true,
										uploadStart: false,
									});
									console.log(downloadURL);
									setFileList([
										...fileList,
										{
											uid: fileList.length + 1,
											name: "Image " + (fileList.length + 1),
											status: "done",
											url: downloadURL,
											thumbUrl: downloadURL,
										},
									]);
									console.log(fileList);
								});
							}
						);
					}}
				>
					<Button className='center' icon={<UploadOutlined />}>
						Back Part
					</Button>
					{(uploadState.uploadStart || uploadState.UploadSuccess) && (
						<Progress type='line' percent={uploadState.uploadProgress} />
					)}
					{uploadState.uploadError && message.error("an error occured")}
				</Upload>
				<Button type='primary' onClick={handleVerify}>
					Submit
				</Button>
			</div>
		</div>
	);
};
export default Verification;
