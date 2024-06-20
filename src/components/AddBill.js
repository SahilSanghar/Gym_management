import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddBill = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

const handleAddBill = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, 'bills'), {
        amount,
        description,
        date: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    };

    return (
    <form onSubmit={handleAddBill}>
    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
    <button type="submit">Add Bill</button>
    </form>
    );
};

export default AddBill;
