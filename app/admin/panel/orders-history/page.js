"use client"

import { useCallback, useEffect, useState } from "react";
import styles from "./orders-history.module.css"
import rmvImg from "../image/Vector (12).png";
import eyesImg from "../image/Vector (14).png"
import Image from 'next/image';
import axios from "axios";
import spinGif from '../image/spin2.gif'

export default function Orders() {
    const [showDelete, setShowDelete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const [selectedOrderProducts, setSelectedOrderProducts] = useState([]); // Specific order's products
    const [selectedOrderId, setSelectedOrderId] = useState(null); // Selected order's ID
    const [spin, setSpin] = useState(true);

    let authorization;
    if (typeof window !== 'undefined') {
        authorization = localStorage.getItem('access_token');
    }

    const fetchOrder = async () => {
        setSpin(true); // Set loading to true before making the API call
        const response = await axios.get('/api/order/history', {
            headers: {
                Authorization: `Bearer ${authorization}`
            }
        });
        setOrder(response);
        setSpin(false); // Set loading to false after the data is fetched
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const deleteOrder = useCallback(async () => {
        if (!selectedOrderId) return;
        console.log("Selected order ID:", selectedOrderId);

        try {
            await axios.delete('/api/order', {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
                data: {
                    order_id: selectedOrderId
                }
            });
            setShowDelete(false);
            await fetchOrder(); // Refresh order list after deletion
        } catch (error) {
            console.error('Error deleting order:', error.response?.data || error.message);
        }
    }, [selectedOrderId]);

    const closeModal = () => {
        setShowDelete(false);
        setIsOpen(false);
    };

    const cancel = () => {
        setShowDelete(false);
    };

    const showRmvPage = (id) => {
        setSelectedOrderId(id); // Set the selected order ID
        setShowDelete(true);
    };

    const allInfo = (id) => {
        setSelectedOrderId(id); // Set the selected order ID for viewing
        const orderData = order.data?.result.data.find((o) => o.id === id); // Find the specific order
        setSelectedOrderProducts(orderData ? orderData.products : []); // Set products for the selected order
        setIsOpen(true);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {spin && (
                <div className={styles.spinnerContainer} >
                    <Image className={styles.spinner} src={spinGif} alt="Loading..." width={400} height={400} />
                </div>
            )}
         
            <section className={styles.orderSection}>
                <div className={styles.backfon} onClick={closeModal} style={{ display: isOpen ? 'block' : 'none' }}></div>

             

                <div className={styles.head}>
                    <h1>Orders</h1>
                </div>
                <div className={styles.divv}>
                    <div className={styles.tableDiv}>
                    
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer ID</th>
                                        <th>Time</th>
                                        <th>Delivery Address</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.data?.result.data?.map((orders, index) => (
                                        <tr key={index}>
                                            <td className={styles.td}>{index + 1}</td>
                                            <td className={styles.td}>{orders.customer_id}</td>
                                            <td className={styles.td}>{new Date(orders.created * 1000).toLocaleDateString()}</td>
                                            <td className={styles.td}>{orders.delivery_address}</td>
                                            <td className={styles.td}>{orders.amount}</td>
                                            <td className={styles.td}>{orders.payment_method === 0 ? 'Cash On Delivery' : 'Pay at the door by credit card'}</td>
                                            <td className={styles.td}>{orders.contact}</td>
                                         
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                </div>
            </section>
        </>
    );
}
