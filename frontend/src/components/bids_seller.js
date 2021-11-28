import { Table } from 'antd';
import React, { useEffect } from 'react'

const { Column } = Table;

export default props => {

    const [ bids, setBids ] = React.useState([]);

    useEffect( async () => {
        const bidsSnap = await db.collection("products")
            .doc(product.id)
            .collection("bids")
            .orderBy("bid", "desc")
            .get()
        setBids(bidsSnap.docs.map( doc => doc.data() ))
    },[] )


    const acceptBid = async bidId => {

        const productSnap = await db.collection("products")
            .doc(product.id)
            .set({
                ...product,
                is_bidding_on: false
            })
        
    }

    return (
        <Table>
            <Column title="Name" dataIndex={"name"} key="name" />
            <Column title="Bid" dataIndex={"bid"} key="bid" />
            <Column title="Actions" render={ (_, record) => {
                return (
                    <button>Accept</button>
                )
            } }
        </Table>
    )


}