import React, { useState } from 'react';
import { firestore } from '../firebase';

const AddMember = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [membership, setMembership] = useState('');

const handleAddMember = async (e) => {
    e.preventDefault();
    try {
    await firestore.collection('members').add({
        name,
        email,
        membership,
        createdAt: new Date()
    });
        console.log('Member added');
    } catch (error) {
        console.error('Error adding member:', error);
    }
};

return (
    <form onSubmit={handleAddMember}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={membership} onChange={(e) => setMembership(e.target.value)} placeholder="Membership" required />
        <button type="submit">Add Member</button>
    </form>
);
};

export default AddMember;
