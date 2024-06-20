const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Create Notification
router.post('/', async (req, res) => {
    const { title, message, date } = req.body;
    try {
    const notificationRef = db.collection('notifications').doc();
    await notificationRef.set({ title, message, date, createdAt: new Date() });
    res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

// View Notifications
router.get('/', async (req, res) => {
    try {
    const notificationsSnapshot = await db.collection('notifications').get();
    const notifications = notificationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(notifications);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

module.exports = router;
