import Layout from "../components/Layout";
import Product from '../components/products/product'
import React from "react";

const Home = () => {
	const products = [{
        id: 1,
        title: "Dokkaebi coffee",
        highest_bid: 420,
        seller: {
            "name": "Mustaq",
            "address": "3/7 johnson road, Kathmandu, Nepal"
        }
    },
    {
        id: 2,
        title: "Dokkaebi coffee",
        highest_bid: 420,
        seller: {
            "name": "Mustaq",
            "address": "3/7 johnson road, Kathmandu, Nepal"
        }
    },
    {
        id: 3,
        title: "Dokkaebi coffee",
        highest_bid: 420,
        seller: {
            "name": "Mustaq",
            "address": "3/7 johnson road, Kathmandu, Nepal"
        }
    }]
    return (
        <Layout>
            <div className="grid grid-cols-4 p-16">
            { products.map(product => {
                return (
                    <div className="col-span-1 p-4">
                        <Product key={product} product={product} />
                    </div>
                )
            }) }
            </div>
        </Layout>
    );
};

export default Home;
