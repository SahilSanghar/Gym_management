import React, { useEffect, useState } from 'react';
import { getMembers, addMember, updateMember, deleteMember } from '../api';

const ViewMembers = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', email: '' });

useEffect(() => {
    fetchMembers();
}, []);

const fetchMembers = async () => {
    try {
        const response = await getMembers();
        setMembers(response.data);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
};

const handleAddMember = async () => {
    try {
        await addMember(newMember);
        setNewMember({ name: '', email: '' });
        fetchMembers();
    } catch (error) {
        console.error('Error adding member:', error);
    }
    };

const handleUpdateMember = async (id, updatedData) => {
    try {
        await updateMember(id, updatedData);
        fetchMembers();
    } catch (error) {
        console.error('Error updating member:', error);
    }
};

const handleDeleteMember = async (id) => {
    try {
        await deleteMember(id);
        fetchMembers();
    } catch (error) {
        console.error('Error deleting member:', error);
    }
};

    return (
    <div>
        <h2>Members</h2>
        <input
        type="text"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        placeholder="Name"
        />
        <input
        type="email"
        value={newMember.email}
        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        placeholder="Email"
        />
        <button onClick={handleAddMember}>Add Member</button>

        <ul>
            {members.map((member) => (
                <li key={member.id}>
                {member.name} ({member.email})
                <button onClick={() => handleUpdateMember(member.id, { name: 'Updated Name', email: 'updated@example.com' })}>Update</button>
                <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
                </li>
        ))}
        </ul>
    </div>
);
};

export default ViewMembers;
