import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const UpdateMember = ({ memberId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [membership, setMembership] = useState('');

    useEffect(() => {
    const fetchMember = async () => {
        const memberDoc = await firestore.collection('members').doc(memberId).get();
        const member = memberDoc.data();
        setName(member.name);
        setEmail(member.email);
        setMembership(member.membership);
    };
    fetchMember();
    }, [memberId]);

const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
    await firestore.collection('members').doc(memberId).update({
        name,
        email,
        membership
    });
        console.log('Member updated');
    } catch (error) {
        console.error('Error updating member:', error);
    }
};

return (
    <form onSubmit={handleUpdateMember}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={membership} onChange={(e) => setMembership(e.target.value)} placeholder="Membership" required />
        <button type="submit">Update Member</button>
    </form>
);
};

export default UpdateMember;
