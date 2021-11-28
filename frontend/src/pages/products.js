import Layout from "../components/Layout";
import Product from '../components/products/product'
import React, { useEffect } from "react";
import { db } from "../firebase";

const Home = () => {

    const [ products, setProducts ] = React.useState([]);

    useEffect( async () => {
        const productsSnap = await db.collection("products").get()
        const productsArray = await Promise.all(productsSnap.docs.map( async doc => {
            const product = doc.data()
            const uid = product.user;
            const user = await db.collection("users").doc(uid).get()
            return {
                id: doc.id,
                ...product,
                user: user.data()
            }
        }))
        setProducts(productsArray)
        console.log(productsArray)
    }, [] )

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
