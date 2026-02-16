# SkillSwap

SkillSwap is a peer-to-peer skill exchange platform where users can trade skills instead of money. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure JWT-based registration and login.
- **Skill Listings**: Post skills you offer with categories and levels.
- **Skill Browsing**: Search and filter skills by category.
- **Exchange Requests**: Request to learn a skill from another user.
- **Dashboard**: Manage your offered skills and track sent/received requests.
- **Reviews**: Rate and review users after exchanges (Backend implemented).
- **Responsive UI**: Built with Tailwind CSS for a modern look.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Auth**: JSON Web Tokens (JWT), BCrypt.

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Local or AtlasURI)

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
   # MONGO_URI=mongodb://localhost:27017/skillswap
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
- `server/models/`: Mongoose models (User, Skill, ExchangeRequest, Review).
- `server/controllers/`: Route logic.
- `server/routes/`: API routes.

## Future Improvements

- AI-based skill recommendations (Placeholder services added).
- Real-time chat for accepted exchanges.
- Video call integration.
