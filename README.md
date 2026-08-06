# SkillSwap

**Status: Active**

SkillSwap is a peer-to-peer skill exchange platform where users can trade skills instead of money. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure JWT-based registration and login.
- **Skill Listings**: Post skills you offer with categories and levels, backed by Joi validation on the server.
- **Skill Browsing**: Search and filter skills by category with real-time debounced searches and input-clear UX.
- **Exchange Requests**: Request to learn a skill from another user.
- **Smart Scheduling**: Integration with **Google Meet** for instant sessions and **Google Calendar** for scheduling.
- **Dashboard**: Manage your offered skills and track sent/received requests.
- **User Profiles**: View public profiles of other users, customize your bio/offered skills, and view blue verification badges for verified members.
- **AI Recommendations**: Receive tailormade recommendations matching your learning goals (skills wanted).
- **Reviews**: Rate and review users after exchanges.
- **Responsive UI**: Built with Tailwind CSS, dark mode support, and resilient Error Boundary wrapping.
- **Logging**: Configurable server request logging outputting to both console and `server/logs/access.log`.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Axios. Includes custom hooks like `useDebounce` and `useLocalStorage`.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), Joi Validation.
- **Auth**: JSON Web Tokens (JWT), BCrypt.

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillSwap
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT=5001
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/skillswapDB
   # JWT_SECRET=your_super_secret_key
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the App**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `client/`: React frontend.
- `server/`: Node.js/Express backend.
- `server/models/`: Mongoose models (User, Skill, Request, Session).
- `server/controllers/`: Route logic.
- `server/routes/`: API routes.

## Future Improvements

- Real-time chat for accepted exchanges.
- In-app video calls (WebRTC).
- Enhanced dashboard UI and analytics.

## License

This project is licensed under the MIT License.

