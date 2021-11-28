import react, { useEffect, useState } from "react"
import { db } from "../firebase"
import { useStateValue } from "../state/stateprovider"

const Reviews = () => {
    const [allReviews, setAllReviews] = useState([])
    const [{user}] = useStateValue()
    useEffect(() => {
        const userId = window.location.pathname.split("/")[3];
        const fetchData = async () => {
            const snap = await db.collection("users").doc(userId).collection("reviews").get()
            const temp = []
            snap.docs.map(s => temp.push(s.data()))
            setAllReviews(temp)
        }
        user && fetchData()
    }, [user])
    return (
        <div className="flex flex-col gap-4">
            {allReviews.map(r => 
                <div className="p-4 rounded border ">
                    <div>{r?.user?.name} (<span>{r?.rating} star</span>)</div>
                    <div>Comment: {r.review}</div>
                </div>
            )}
        </div>
    )
}

export default Reviews;