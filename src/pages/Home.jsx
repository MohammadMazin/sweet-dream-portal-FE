import { Children } from 'react'
import { useEffect, useState } from 'react'
import AddOrder from '../components/AddOrder'
import Order from '../components/Order'
import { getAllOrders } from '../services/orders'
const Home = () => {

    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await getAllOrders()
            if (res.success) {
                setOrders(res.data)
                setFilteredOrders(res.data)
            }
            else
                alert('Could not fetch orders. Check your internet connection and reload the page')
        }
        fetchData()
    }, [])



    function generateTotalRevenue() {
        const totalPrice = orders?.map(order => order?.amount)
        return totalPrice?.reduce((prevAmount, currAmount) => prevAmount + currAmount, 0)
    }
    function generateUnearnedRevenue() {
        const totalPrice = orders?.map(order => { return order?.paid === 0 ? order?.amount : 0 })
        return totalPrice.reduce((prevAmount, currAmount) => prevAmount + currAmount, 0)
    }
    function generateEarnedRevenue() {
        const totalPrice = orders?.map(order => { return order?.paid === 1 ? order?.amount : 0 })
        return totalPrice.reduce((prevAmount, currAmount) => prevAmount + currAmount, 0)
    }


    function handleShowAllOrders() {
        setFilteredOrders(orders)
    }
    function handleShowCompletedOrders() {
        console.log(orders.map(order => { return order?.paid === 0 && order }))
        setFilteredOrders(prevFilter => orders.map(order => { return order?.paid === 1 && order }))
    }
    function handleShowIncompleteOrders() {
        setFilteredOrders(prevFilter => orders.map(order => { return order?.paid === 0 && order }))
    }



    return (
        <div style={{ backgroundColor: '#f4f4f4' }}>
            <h1>Add Order</h1>
            <AddOrder setOrders={setOrders} />
            <hr />

            <h1>Orders</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleShowAllOrders}>View All Orders</button>
                <button onClick={handleShowCompletedOrders}>View Completded Orders</button>
                <button onClick={handleShowIncompleteOrders}>View Incompleted Orders</button>
            </div>
            <h4>Total Revenue: {generateTotalRevenue()} PKR</h4>
            <h4>Unearned Revenue: {generateUnearnedRevenue()} PKR</h4>
            <h4>Earned Revenue: {generateEarnedRevenue()} PKR</h4>
            <hr />
            <hr />
            {filteredOrders.reverse().map((order, index) => {
                const { name, quantity, location, amount, paid } = order
                if (typeof order !== "object")
                    return null
                return (
                    <>
                        <h5>Order {index + 1}</h5>
                        <Order data={order} setOrders={setOrders} />
                        <hr />
                    </>
                )
            })}
        </div>
    )
}

export default Home