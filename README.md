# Sales Booking Tool 🚀

A modern, AI-powered sales management and booking platform built with React, Node.js, and PostgreSQL.

## ✨ Features

### Core Features
- **Dashboard**: Comprehensive sales metrics and today's schedule
- **Lead Management**: Advanced lead scoring and pipeline tracking
- **Smart Calendar**: Booking links with automated reminders
- **Deal Pipeline**: Visual Kanban board for deal management
- **Task Management**: Automated follow-ups and reminders
- **Communication Tools**: Integrated email, calls, and proposals
- **Reporting & Analytics**: Detailed performance dashboards
- **Team Collaboration**: Real-time updates and notifications

### Advanced Features
- **AI-Powered Lead Scoring**: Machine learning-based lead recommendations
- **Calendar Integration**: Google Calendar and Outlook sync
- **Email Automation**: Sequences and drip campaigns
- **PWA Support**: Mobile-optimized progressive web app
- **Real-time Updates**: WebSocket-based live notifications
- **Dark/Light Mode**: Modern theme switching
- **Responsive Design**: Works perfectly on all devices

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for state management
- **React Hook Form** for form handling
- **Chart.js** for data visualization

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Bull Queue** for background jobs
- **Nodemailer** for email automation

### Infrastructure
- **Docker** for containerization
- **Redis** for caching and sessions
- **AWS S3** for file storage
- **Vercel/Netlify** deployment ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sales-booking-tool.git
   cd sales-booking-tool
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Edit the .env files with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
sales-booking-tool/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── stores/         # State management
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema
│   └── package.json
├── docs/                   # Documentation
├── docker-compose.yml      # Docker configuration
└── README.md
```

## 🎨 Design System

The application uses a monochrome color palette with a single accent color:

### Color Palette
- **Primary**: #000000 (Black)
- **Secondary**: #6B7280 (Gray-500)
- **Background**: #FFFFFF (White) / #0F172A (Dark)
- **Accent**: #3B82F6 (Blue-500)
- **Success**: #10B981 (Emerald-500)
- **Warning**: #F59E0B (Amber-500)
- **Error**: #EF4444 (Red-500)

### Typography
- **Font Family**: Inter (System font fallback)
- **Headings**: 700 weight
- **Body**: 400 weight
- **UI Elements**: 500 weight

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Push Notifications**: Real-time alerts and reminders
- **App-like Experience**: Full-screen mobile experience
- **Background Sync**: Sync data when connection is restored
- **Install Prompt**: Add to home screen functionality

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-based Access**: Granular permissions
- **Rate Limiting**: API protection
- **Data Encryption**: Sensitive data protection
- **HTTPS Only**: Secure connections enforced
- **CORS Protection**: Cross-origin request security

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests only
cd frontend && npm test

# Run backend tests only
cd backend && npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy using your preferred platform

### Deployment Options
- **Vercel** (Recommended for frontend)
- **Heroku** (Full-stack deployment)
- **AWS** (Scalable cloud deployment)
- **DigitalOcean** (Cost-effective option)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@salestool.com or join our Slack channel.

## 🗺 Roadmap

- [ ] Mobile apps (iOS/Android)
- [ ] Advanced AI features
- [ ] Integrations marketplace
- [ ] White-label solution
- [ ] Advanced reporting
- [ ] Multi-language support

---

Built with ❤️ by the Sales Tool Team