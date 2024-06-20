const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Add Member
router.post('/', async (req, res) => {
    const { name, email, membership } = req.body;
    try {
        const memberRef = db.collection('members').doc();
        await memberRef.set({ name, email, membership, createdAt: new Date() });
        res.status(201).json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Member
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, membership } = req.body;
    try {
        const memberRef = db.collection('members').doc(id);
        await memberRef.update({ name, email, membership });
        res.status(200).json({ message: 'Member updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Member
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const memberRef = db.collection('members').doc(id);
    await memberRef.delete();
    res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

module.exports = router;
