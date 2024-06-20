const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Create Bill
router.post('/', async (req, res) => {
    const { memberId, amount, date } = req.body;
    try {
    const billRef = db.collection('bills').doc();
    await billRef.set({ memberId, amount, date, createdAt: new Date() });
    res.status(201).json({ message: 'Bill created successfully' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

// View Bills
router.get('/', async (req, res) => {
    try {
    const billsSnapshot = await db.collection('bills').get();
    const bills = billsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(bills);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

module.exports = router;
