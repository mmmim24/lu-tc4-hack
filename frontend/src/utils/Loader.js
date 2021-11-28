import { Spin } from "antd";
import React from "react";

const Loader = ({ loading, children }) => {
	return <div className="h-sceen w-screen">
	<Spin className="w-full h-full" spinning={loading}>{children}</Spin>
	</div>
};

export default Loader;
