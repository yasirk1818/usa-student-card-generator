const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate-card', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ error: 'Photo is required' });
        }

        const {
            firstName,
            lastName,
            studentId,
            dateOfBirth,
            phone,
            university,
            department,
            graduationYear,
            issueDate,
            cardExpiry,
            emergencyContact
        } = req.body;

        // Generate QR code
        const qrData = {
            name: `${firstName} ${lastName}`,
            id: studentId,
            university: university,
            dob: dateOfBirth
        };
        
        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData));

        // Generate unique card ID
        const cardId = uuidv4();

        const cardData = {
            cardId,
            firstName,
            lastName,
            studentId,
            dateOfBirth,
            phone,
            university,
            department,
            graduationYear,
            emergencyContact,
            photoPath: req.files.photo[0].filename,
            logoPath: req.files.logo ? req.files.logo[0].filename : null,
            qrCode: qrCodeDataURL,
            issueDate: issueDate ? new Date(issueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
            expiryDate: cardExpiry ? new Date(cardExpiry).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : new Date(Date.now() + (4 * 365 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        };

        res.render('card', { cardData });
    } catch (error) {
        console.error('Error generating card:', error);
        res.status(500).json({ error: 'Failed to generate card' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
    console.log(`USA Student Card Generator is running on port ${PORT}`);
    console.log(`Open your browser and go to http://localhost:${PORT}`);
});