import Layout from "../components/Layout";
import Product from "../components/products/product";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getGatewayURL } from "../utils/payment";

const Home = () => {
    
    useEffect( () => {
        fetch("http://localhost:5003/practice-management-system/us-central1/api3/init")
        .then( v => {
            return v.json()
        } ).then( v => console.log(v) );
    }, [] )

    return <Layout ></Layout>

};

export default Home;
