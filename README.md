# Skip Hire Booking System

A modern, user-friendly skip hire booking system built with React, TypeScript, and Tailwind CSS. The system features a beautiful UI with smooth animations and a seamless booking experience.

## 🚀 Features

### Payment System
- Interactive credit card display with real-time updates
- Support for multiple card types (Visa, Mastercard, Amex)
- Beautiful card type indicators with official brand colors
- Smooth animations and transitions
- Secure payment processing

### Booking Process
- Multi-step booking form
- Date and time selection
- Skip size selection
- Location-based pricing
- Personal details collection
- Order summary and confirmation

### UI/UX Highlights
- Responsive design
- Modern gradient backgrounds
- Smooth animations using Framer Motion
- Interactive form elements
- Real-time validation
- Loading states and error handling

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.3.5
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Build Tool:** Vite
- **Package Manager:** npm/yarn

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/duresaguye/skip-hire-booking
cd skip-hire-booking
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── booking/
│   │   └── steps/
│   │       ├── payment-card-display.tsx
│   │       ├── payment-details-popup.tsx
│   │       └── payment-step.tsx
│   └── ui/
├── styles/
│   └── index.css
└── App.tsx
```

## 🎨 UI Components

### Payment Card Display
The payment card display component (`payment-card-display.tsx`) features:
- Real-time card type detection
- Official brand colors and gradients
- Interactive card type selectors
- Smooth animations and transitions
- Responsive design

### Payment Details Popup
The payment details popup (`payment-details-popup.tsx`) includes:
- Personal information collection
- Form validation
- Smooth animations
- Responsive layout
- Error handling

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url
```

## 🚀 Deployment

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Preview the production build:
```bash
npm run preview
# or
yarn preview
```
