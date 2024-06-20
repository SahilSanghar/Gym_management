import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';


const ViewBills = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
    const fetchBills = async () => {
        const billsCollection = collection(db, 'bills');
        const billSnapshot = await getDocs(billsCollection);
        const billList = billSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBills(billList);
    };
    fetchBills();
    }, []);

return (
    <div>
        <h1>View Bills</h1>
        <ul>
        {bills.map(bill => (
            <li key={bill.id}>
            {bill.amount} - {bill.description} - {bill.date.toDateString()}
            </li>
        ))}
        </ul>
    </div>
);
};

export default ViewBills;
