# OKR Tracker

This is a React-based OKR (Objectives and Key Results) Tracker application. It allows users to set and track goals at various levels: Annual, Quarterly, Monthly, Weekly, and Daily.

## Features

- Set and track goals for multiple categories
- Dark mode support
- Work timer functionality
- Data persistence using localStorage

## Running the app locally

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the required dependencies.
5. Run `npm start` to start the development server.
6. Open your browser and go to `http://localhost:3000` to view the app.

## Deploying to GitHub and Netlify

1. Create a new repository on GitHub.
2. Initialize git in your local project folder (if not already done):
   ```
   git init
   ```
3. Add all files to git:
   ```
   git add .
   ```
4. Commit the files:
   ```
   git commit -m "Initial commit"
   ```
5. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
6. Push your code to GitHub:
   ```
   git push -u origin main
   ```
7. Log in to your Netlify account and click "New site from Git".
8. Choose GitHub as your Git provider and select your repository.
9. In the deploy settings, the build command and publish directory should be automatically detected from the netlify.toml file.
10. Click "Deploy site".

Netlify will now automatically deploy your site whenever you push changes to your GitHub repository.

## Technologies Used

- React
- Tailwind CSS
- localStorage for data persistence
- Yarn for package management (installed locally as a dev dependency)

## Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Runs the test watcher in an interactive mode
- `npm run eject`: Ejects from create-react-app
- `npm run check-updates`: Checks for outdated dependencies
- `npm run update-deps`: Interactively update dependencies
- `npm run clean-install`: Performs a clean installation of dependencies

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)