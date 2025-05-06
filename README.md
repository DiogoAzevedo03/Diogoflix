# MFlix Movie Database Application

A simple React and Node.js application that connects to a MongoDB database containing movie data from the sample_mflix dataset. The application displays a list of movies and allows users to view individual movie details along with comments.

## Project Structure

## Features

- Display paginated list of movies
- View detailed information about each movie
- View user comments for each movie
- Responsive design for different screen sizes

```
mflix-project/
├── backend/             # Node.js Express API
│   ├── models/          # MongoDB models
│   │   ├── Movie.js
│   │   └── Comment.js
│   ├── routes/          # API routes
│   │   └── movieRoutes.js
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Main server file
│
└── frontend/            # React application
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/  # React components
    │   │   ├── CommentForm.js
    │   │   ├── CommentList.js
    │   │   ├── Moviecard.js
    │   │   ├── MovieForm.js
    │   │   ├── MovieList.js
    │   │   ├── MovieSearch.js
    │   │   ├── navbar.js
    │   │   ├── MovieDetail.js
    │   │   └── SearchResultsPage.js
    │   ├── services/    # API services
    │   │   └── api.js
    │   ├── App.js       # Main App component
    │   ├── index.js     # React entry point
    │   └── index.css    # Global styles
    ├── .env             # Frontend environment variables
    └── package.json     # Frontend dependencies
```

## Installation and Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)
- The sample_mflix dataset loaded in your MongoDB

### Backend Setup

1. Create a directory for your project and navigate to it:
   ```
   mkdir mflix-project
   cd mflix-project
   ```

2. Create a backend folder and copy the backend files:
   ```
   mkdir backend
   cd backend
   ```

3. Copy all the backend files into the backend folder

4. Create a `.env` file in the backend folder with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_connection_string
   ```

5. Install dependencies and start the server:
   ```
   npm install
   npm start
   ```

   The server should start at http://localhost:5000

### Frontend Setup

1. Open a new terminal, navigate to the project directory, and create a frontend folder:
   ```
   cd mflix-project
   mkdir frontend
   cd frontend
   ```

2. Copy all the frontend files into the frontend folder

3. Install dependencies and start the React development server:
   ```
   npm install
   npm start
   ```

   The frontend should be available at http://localhost:3000

## How to Use

1. Open your browser and go to http://localhost:3000
2. Browse through the list of movies using the pagination controls
3. Click on any movie card to view its details and comments
4. Use the "Back to Movies" button to return to the movie list

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Frontend**:
  - React
  - React Router
  - Axios
  - CSS