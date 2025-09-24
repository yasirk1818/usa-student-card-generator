# USA Student Card Generator

A professional Node.js web application for generating realistic USA student ID cards with advanced security features including hologram effects, QR codes, barcodes, and high-quality design.

## Features

### 🎓 Professional Student ID Cards
- **Realistic Design**: Authentic-looking student ID cards with university branding
- **Hologram Effects**: Animated CSS hologram overlay for security
- **Professional Layout**: Clean, modern design with proper spacing and typography

### 📸 Image Upload System
- **Drag & Drop**: Easy photo upload with drag and drop functionality
- **Live Preview**: Real-time image preview before card generation
- **Format Support**: JPG, PNG, GIF formats supported (up to 5MB)
- **Image Validation**: Automatic file type and size validation

### 🔒 Security Features
- **QR Code**: Embedded QR code with student information
- **Barcode**: Realistic barcode on card back
- **Unique Card ID**: Each card gets a unique identifier
- **Security Patterns**: Micro-pattern backgrounds for authenticity
- **Magnetic Stripe**: Visual magnetic stripe simulation

### 🎨 Advanced Styling
- **Responsive Design**: Works on desktop, tablet, and mobile
- **CSS Animations**: Smooth hologram and interaction effects
- **Modern UI**: Clean, professional interface with Font Awesome icons
- **Print Support**: Optimized for printing actual cards

### 📱 User Experience
- **Form Validation**: Real-time validation with helpful error messages
- **Auto-formatting**: Phone numbers and student IDs auto-format
- **Loading States**: Visual feedback during card generation
- **Download Options**: High-quality PNG downloads for both front and back

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and go to `http://localhost:3000`

## Usage

1. **Fill Student Information**: Enter all required student details
2. **Upload Photo**: Drag and drop or click to upload student photo
3. **Generate Card**: Click the generate button to create the ID card
4. **Download/Print**: Save the card as PNG or print directly

## Technical Details

### Backend
- **Node.js** with Express.js framework
- **Multer** for file upload handling
- **QRCode** library for QR code generation
- **EJS** templating engine

### Frontend
- **Responsive CSS** with modern design
- **JavaScript** for interactive features
- **Font Awesome** icons
- **Google Fonts** (Roboto)
- **HTML2Canvas** for card download functionality

### Security
- File type validation
- File size limits (5MB)
- Input sanitization
- Unique card identifiers

## Card Features

### Front Side
- University name and branding
- Student photo with professional border
- Complete student information
- QR code with encoded data
- Issue and expiry dates
- Unique card ID
- Hologram overlay effect

### Back Side
- Terms and conditions
- Magnetic stripe simulation
- Barcode with student ID
- Emergency contact information
- Security micro-patterns
- Help and support info

## Customization

You can easily customize:
- University names and branding
- Color schemes in CSS
- Card layout and design
- Security features
- Form fields and validation

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is for educational and demonstration purposes. Please ensure compliance with local laws and regulations when creating identification documents.