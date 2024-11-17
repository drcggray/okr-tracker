# OKR Tracker

A React-based application for tracking Objectives and Key Results (OKRs) across different time periods and life categories.

## Features

- Track goals across multiple categories (Finance, Career, Health, etc.)
- Hierarchical goal structure (Annual → Quarterly → Monthly → Weekly → Daily)
- Dark mode support
- Work timer for productivity
- Persistent storage using localStorage
- Responsive design
- Performance optimized with React.lazy loading

## Tech Stack

- React 18
- Context API for state management
- TailwindCSS for styling
- React Error Boundary for error handling
- Web Vitals for performance monitoring

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/okr-tracker.git
cd okr-tracker
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

The application will be available at `http://localhost:3000`

### Environment Setup

Create the following environment files:

`.env.development`:
```
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3000
```

`.env.production`:
```
REACT_APP_ENV=production
REACT_APP_API_URL=https://okr-tracker.netlify.app
```

## Building for Production

```bash
yarn build
# or
npm run build
```

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy!

The application is configured for continuous deployment through Netlify. Any push to the main branch will trigger a new deployment.

### Google Authentication Setup

To enable Google login:

1. Create a project in Google Cloud Console
2. Enable Google Sign-In API
3. Create OAuth 2.0 credentials
4. Add authorized JavaScript origins and redirect URIs
5. Update environment variables with your Google Client ID

## Development

### Available Scripts

- `yarn start`: Start development server
- `yarn build`: Build for production
- `yarn test`: Run tests
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Fix ESLint issues
- `yarn format`: Format code with Prettier
- `yarn analyze`: Analyze bundle size

### Project Structure

```
src/
  ├── components/        # React components
  ├── context/          # React Context providers
  ├── hooks/            # Custom React hooks
  ├── utils/            # Utility functions
  ├── types/            # TypeScript types (if used)
  ├── App.js            # Main App component
  └── index.js          # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- Netlify for hosting
- Contributors and users of the application
