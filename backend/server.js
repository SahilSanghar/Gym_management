const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// console.log('Environment variables:', process.env);

const app = express();
app.use(cors());
app.use(express.json());


const jsonFilePath = process.env.FIREBASE_ADMIN_SDK_JSON_PATH;
if (!jsonFilePath) {
    console.error('FIREBASE_ADMIN_SDK_JSON_PATH environment variable is not set.');
    process.exit(1);
}

// Read and parse the Firebase Admin SDK JSON file
let serviceAccount;
try {
    serviceAccount = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
} catch (error) {
    console.error('Error reading or parsing Firebase Admin SDK JSON file:', error);
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gym-management-50506/.firebaseio.com"
});

// Import Routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/member');
const billRoutes = require('./routes/bill');
const notificationRoutes = require('./routes/notification');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
