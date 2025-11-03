![image alt](https://github.com/soumik988/Image-Search-Aplication-/blob/1b5d5ec9928aa765eac616d416864234f49285f4/Screenshot%202025-11-03%20142015.png)
![image alt](https://github.com/soumik988/Image-Search-Aplication-/blob/b4d1a34878173fed90a662eb79f38396df124acf/Screenshot%202025-11-03%20142105.png)
![image alt](https://github.com/soumik988/Image-Search-Aplication-/blob/406233989d9e2ad4e165b6239a62c1cf57b97faa/Screenshot%202025-11-03%20142138.png)
![image alt](https://github.com/soumik988/Image-Search-Aplication-/blob/85466f6f4eac9db0cb82820a2ba32bbd57cae341/Screenshot%202025-11-03%20142159.png)



# Image Search Application

A full-stack **MERN + OAuth** project that allows authenticated users to search images from **Unsplash API**, view top searches, track search history, and select/download multiple images.

---

## 🔹 Features

- OAuth login via **Google**, **GitHub**, and **Facebook**.
- Search images using **Unsplash API**.
- Top 5 most frequent search terms banner.
- User search history with timestamps.
- Multi-select images with **Select All / Clear Selection**.
- Download selected images as a ZIP.
- Responsive UI for mobile and desktop.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB, Passport.js (OAuth)  
- **Other:** Axios, JSZip, FileSaver  

---

## 📁 Folder Structure





ImageSearch/
│
├── backend/ # Node.js + Express server
│ ├── controllers/ # API controllers
│ ├── routes/ # Express routes
│ ├── models/ # MongoDB models
│ ├── config/ # Passport and DB configuration
│ ├── server.js # Main server file
│
├── frontend/ # React client
│ ├── src/
│ │ ├── pages/ # Pages like HomePage, Login
│ │ ├── components/ # UI components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── lib/ # API calls
│ │ └── App.jsx # Main app file
│ └── package.json
│
├── README.md
└── .gitignore



PORT=5000
MONGO_URI=mongodb+srv://soumikghosh072_db_user:Soumik123@cluster0.uawgnkh.mongodb.net/SearchImage_db?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=supersecretkey

GOOGLE_CLIENT_ID=1090234353576-dj72vm0c6boic2fbghbk9rrlsst2qmof.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

FACEBOOK_CLIENT_ID=1862023447732887
FACEBOOK_CLIENT_SECRET=c9d7e8524243198c4fe0ac4a296f3b5c

GITHUB_CLIENT_ID=Ov23lihHfnM5EbUbWbrX
GITHUB_CLIENT_SECRET=112d6ca11756ad5aac1d4116dbb79cae430cac28

UNSPLASH_ACCESS_KEY=d2K942SKX-CVhwCO3lhT8aqmWlF2s_7Uazbo7Jr5nvo

FRONTEND_URL=http://localhost:5173



| Method | Endpoint                  | Body / Query | Description                                   |
| ------ | ------------------------- | ------------ | --------------------------------------------- |
| GET    | `/auth/google`            | -            | Redirects user to Google login                |
| GET    | `/auth/github`            | -            | Redirects user to GitHub login                |
| GET    | `/auth/facebook`          | -            | Redirects user to Facebook login              |
| GET    | `/auth/google/callback`   | -            | Callback for Google OAuth                     |
| GET    | `/auth/github/callback`   | -            | Callback for GitHub OAuth                     |
| GET    | `/auth/facebook/callback` | -            | Callback for Facebook OAuth                   |
| GET    | `/auth/logout`            | -            | Logout current user                           |
| GET    | `/auth/me`                | -            | Get logged-in user info (name, email, avatar) |



| Method | Endpoint            | Body Example         | Description                                            |
| ------ | ------------------- | -------------------- | ------------------------------------------------------ |
| POST   | `/api/search`       | `{ "term": "cats" }` | Search images by term and save to user history         |
| GET    | `/api/top-searches` | -                    | Get top 5 most searched terms across users             |
| GET    | `/auth/history`     | -                    | Get the current user’s search history (with timestamp) |



| Method | Endpoint         | Body Example              | Description                |
| ------ | ---------------- | ------------------------- | -------------------------- |
| POST   | `/api/favorites` | `{ "imageId": "abc123" }` | Add image to favorites     |
| GET    | `/api/favorites` | -                         | Get user’s favorite images |

