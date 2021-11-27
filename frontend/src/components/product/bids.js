import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../state/stateprovider';
import { db } from '../../firebase';

const { Column } = Table;

export default props => {

    const product = props.product
    const userId = useStateValue()[0].user.uid;
    const [ bids, setBids ] = React.useState([]);
    const [ current_user_bid, set_current_user_bid ] = useState({
        selected_bid: null,
        accepted: false
    });
    const [ current_user_owner, set_current_user_owner ] = useState(false);


    useEffect( async () => {

        if( product.seller.id == userId ) {
            set_current_user_owner(true);
            const bidsSnap = await db.collection("products")
                .doc(product.id)
                .collection("bids")
                .orderBy("bid", "desc")
                .get()
            setBids(bidsSnap.docs.map( doc => ({...doc.data(), id: doc.id}) ))
        }


        if( !product.is_bidding_off && product.accepted_bid_id ) {
            const selected_bid_snap = await db
                .collection("products")
                .doc(product.id)
                .collection("bids")
                .where('id', '==', product.accepted_bid_id)
                .get()
            const selected_bid = selected_bid_snap.docs[0].data()
            if(selected_bid.user == product.user.id) {
                set_current_user_bid({
                    selected_bid: selected_bid,
                    accepted: true
                })
            }
        }
    },[] )


    const onAccept = async bid_id => {

    }


    const acceptBid = async bidId => {

        await db.collection("products")
            .doc(product.id)
            .set({
                ...product,
                is_bidding_off: true,
                accepted_bid_id: bidId
            })  
    }

    const turn_on_bidding = async () => {
        await db.collection("products")
            .doc(product.id)
            .set({
                ...product,
                is_bidding_off: false,
                accepted_bid_id: null
            })
    }


    console.log("GGGG");


    return (
        current_user_bid.accepted ? 
            <Button > Accept buy offer for { current_user_bid.selected_bid.bid } </Button>
        : props.product.is_bidding_off ? (
            <div className='flex'>
            <div> Bidding is currently closed for this product </div>
            {current_user_owner ? <Button onClick={ turn_on_bidding }> Turn on bidding </Button> : <></>}
            </div>
        ): current_user_owner ?
            <Table
                
            >
                <Column title="Name" dataIndex={"name"} key="name" />
                <Column title="Bid" dataIndex={"bid"} key="bid" />
                <Column title="Actions" render={ (_, record) => {
                    return (
                        <button onClick={() => acceptBid(record.id)} >Accept</button>
                    )
                } }/>
            </Table>
        : <div>You are a normal user</div>
    )
}