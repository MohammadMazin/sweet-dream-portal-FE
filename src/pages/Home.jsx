import { Children } from 'react'
import { useEffect, useState } from 'react'
import AddOrder from '../components/AddOrder'
import Order from '../components/Order'
import { getAllOrders } from '../services/orders'
import toast, { Toaster } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import Collapsible from 'react-collapsible';

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

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };



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
        <>
            <div><Toaster /></div>


            <div style={{ backgroundColor: '#f4f4f4' }}>
                <Collapsible trigger="Click to add order" style={{ backgroundColor: 'red' }}>
                    <h1>Add Order</h1>
                    <AddOrder setOrders={setOrders} />
                    <hr />
                </Collapsible>
                <button onClick={() => downloadExcel(orders)}>
                    Download Orders Details As Excel Spreadsheet
                </button>


                <h1>{orders.length} Orders</h1>
                {/* <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleShowAllOrders}>View All Orders</button>
                    <button onClick={handleShowCompletedOrders}>View Completded Orders</button>
                    <button onClick={handleShowIncompleteOrders}>View Incompleted Orders</button>
                </div> */}
                <h4>Total Revenue: {generateTotalRevenue()} PKR</h4>
                <h4>Unearned Revenue: {generateUnearnedRevenue()} PKR</h4>
                <h4>Earned Revenue: {generateEarnedRevenue()} PKR</h4>
                <hr />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                    {/* {filteredOrders.reverse().map((order, index) => { */}
                    {orders.reverse().map((order, index) => {
                        if (typeof order !== "object")
                            return null
                        return (
                            <>
                                <Order index={index + 1} data={order} setOrders={setOrders} />
                            </>
                        )
                    })}
                </div>
            </div>
        </>

    )
}

export default Home