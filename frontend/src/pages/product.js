import Layout from "../components/Layout";
import Product from '../components/products/product'
import React from "react";
import productImg from '../static/dokkaebi.png'
import { Carousel } from "antd";

const Home = () => {
    
    const product = {
        title: 'Dokkaebi coffee',
        description: 'Dokkaebi drinking qbistro coffee (green) Dokkaebi drinking qbistro coffee (green) Dokkaebi drinking qbistro coffee (green)Dokkaebi drinking qbistro coffee (green)',
        seller: {
            name: 'Mustaq',
            address: '3/7 johnson road, Kathmandu, Nepal'
        },
        minimum_bid: 420,
        bidding_is_off: false,
    }

    // sort by highest bid
    // sort by rating ( including negative rating )
    // if consecutive reviews all negative suspend user
    // user can drop the product at our warehouse or request us to collect it from  him/her
    // fremium user posts will expire within 5days premium users posts will expire within 1 year

    const bids = [
        {
            bidder: {
                name: 'Mustaq',
                address: '3/7 johnson road, Kathmandu, Nepal'
            },
            time: new Date(),
            bid: 420
        }
    ]

    return (
        <Layout>
            <div className="grid grid-cols-4 p-8">
                <div className="col-span-3">
                    <div className="w-full  flex justify-center" >
                        <img src={productImg} style={{maxHeight: '20rem'}} alt="product" className=" rounded-xl" />
                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-2xl mb-4" > { product.title } </div>
                    <div className="text-md mb-4" > { product.description } </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
