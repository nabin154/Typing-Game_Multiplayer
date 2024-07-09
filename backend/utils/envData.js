
const { PORT, MONGODB_URI, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN  ,
     GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
} = process.env;
const REACT_APP_URL = 'https://nabin-typing-game.vercel.app';
// const REACT_APP_URL = 'http://localhost:5173';

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN,
    REACT_APP_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
};