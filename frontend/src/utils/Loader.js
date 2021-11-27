import { Spin } from "antd";
import React from "react";

const Loader = ({ loading, children }) => {
	return <Spin spinning={loading}>{children}</Spin>;
};

export default Loader;
