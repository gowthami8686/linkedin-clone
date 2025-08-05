# LinkedIn Clone

A modern, responsive LinkedIn clone built with React, TypeScript, and Tailwind CSS. This application replicates the core features of LinkedIn with a beautiful and intuitive user interface.

## Features

### 🔐 Authentication
- User registration and login
- Secure authentication flow
- Password visibility toggle
- Remember me functionality

### 🏠 Home Feed
- Create and share posts
- Like, comment, and share posts
- Real-time post interactions
- Rich text and media support

### 👥 Network Management
- Connect with other professionals
- View pending invitations
- Discover people you may know
- Manage connections

### 💼 Job Search
- Browse job listings
- Apply to positions
- Save interesting jobs
- Job recommendations

### 💬 Messaging
- Real-time chat interface
- Conversation management
- Message history
- Unread message indicators

### 🔔 Notifications
- Real-time notifications
- Different notification types
- Mark as read functionality
- Notification preferences

### 👤 Profile Management
- Professional profile creation
- Experience and education sections
- Profile customization
- Professional achievements

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Feed.tsx
│   │   ├── Profile.tsx
│   │   ├── Network.tsx
│   │   ├── Jobs.tsx
│   │   ├── Messaging.tsx
│   │   ├── Notifications.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## Features in Detail

### Authentication System
- Clean login and registration forms
- Form validation
- Loading states
- Error handling

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts
- Touch-friendly interfaces

### Modern UI/UX
- LinkedIn-inspired design
- Smooth animations
- Hover effects
- Professional color scheme

### Component Architecture
- Reusable components
- TypeScript interfaces
- Props validation
- Clean code structure

## Customization

### Colors
The application uses LinkedIn's color palette defined in `tailwind.config.js`:
- Primary Blue: `#0077B5`
- Dark Blue: `#004182`
- Light Blue: `#E8F3FF`
- Gray tones for text and borders

### Styling
- Custom CSS classes in `src/index.css`
- Tailwind utility classes
- Responsive breakpoints
- Component-specific styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. LinkedIn is a registered trademark of LinkedIn Corporation.

## Future Enhancements

- [ ] Real-time messaging with WebSocket
- [ ] File upload functionality
- [ ] Advanced search filters
- [ ] Dark mode support
- [ ] Mobile app version
- [ ] Backend integration
- [ ] Real-time notifications
- [ ] Video calling feature
- [ ] Advanced analytics
- [ ] Multi-language support 