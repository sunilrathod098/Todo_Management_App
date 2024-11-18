
# User Management Application Documentation
## Overview
- The User Management Application is a web-based tool that enables administrators to manage user data efficiently. It includes functionalities for adding, updating, deleting, and viewing user information. The project uses modern web technologies, including HTML, CSS, JavaScript, and Bootstrap, along with a Node.js backend, Express.js for API management, and MongoDB as the database



## Assginment
- 1. Create a web application and connect with mongoDB
- 2. Create a user registration page using bootstrap. Users field will be Name, Password, Email, Phone No, Profession. 
### Note: Password should be save in encrypted format. 
- 3. Send the user registration data to server by calling API. And show notification after
getting response back from server. 
- 4. Create login page and validate email and password, once user verified, then take
them to home page. 
- 5. In homepage, Create a API to list all registered users in a JSON structure. 
- 6. Create an API to update registered user data like name, phone number after
selecting record from above structure. 
- 7. Same way, create an API to delete registered user record.


# User Management Application

- A simple web application with features like user registration, login, user-home page, and CRUD operations using MongoDB, Express.js, and Bootstrap.

### Features

- User Registration with encrypted passwords.
- User Login with email and password validation.
- Token-based authentication using JWT.
- View, Update, and Delete registered users.
- Frontend designed using Bootstrap.

### Technologies Used

- **Backend**: Node.js, Express.js, MongoDB.
- **Frontend**: HTML, CSS, Bootstrap.
- **Authentication**: JWT (JSON Web Tokens).
- **Database**: MongoDB (Mongoose as ODM).

### Setup Instructions
- Follow these steps to set up and run the project locally:

*1. Prerequisites*
- **Node.js**: Ensure you have Node.js installed on your system. Download it from Node.js.
- **MongoDB**: Install and run MongoDB on your local system or use MongoDB Atlas.
- **Git** (optional): For cloning the repository.

*2. Clone the Repository*
- Use Git to clone the repository:
- *git clone [(https://github.com/sunilrathod098/User-Management.git)]*
Alternatively, download the project as a ZIP file and extract it.

*3. Install Dependencies*
- Navigate to the project folder and install the required dependencies:
- *cd <GEN-TECH_ASSGT>*
- npm install

- *Demo Video Link*-[(https://www.loom.com/share/ab5908a0f41e475180ba2dbefe82857d?sid=cc17a541-e185-4cf3-92e3-433ac5f07bb2)]

*4. Add a .env File*
- Create a .env file in the root directory with the following variables:

- *MONGODB_URI*= (<Your MongoDB connection string>)
- *ACCESS_TOKEN_SECRET*= (<Your access token secret>)
- *REFRESH_TOKEN_SECRET*= (<Your refresh token secret>)
- *ACCESS_TOKEN_EXPIRY*=1d
- *REFRESH_TOKEN_EXPIRY*=30d
- *PORT*=5000
- *CORS_ORIGIN*=*
- Replace (<Your MongoDB connection string>) with your MongoDB URI.
- Replace (<Your access token secret> and <Your refresh token secret>) with strong, random strings.

*5. Run the Application*
- Start the server:  **npm run dev**

- The backend will be running on http://localhost:5000.

*6. Frontend Setup*
- Open the index.html file in a browser. Ensure the frontend can interact with the backend APIs.

*7. Testing the Application*
- Register a User: Go to the register.html page and create a new user.
- Login: Navigate to login.html and log in using your registered credentials.
- View All Users: Once logged in, you can view, update, and delete user records on the homepage.


## Project Structure
- Gen-TECH_ASSGT/
- ├── src/
- │   ├── config/
- │   │   ├── db.js            # Database connection
- │   │   ├── ApiError.js      # Custom error handling
- │   │   ├── ApiResponse.js   # Custom response structure
- │   │   ├── asyncHandler.js  # Async middleware
- │   ├── controller/
- │   │   └── user.controller.js  # User-related controller functions
- │   ├── middleware/
- │   │   └── auth.middleware.js  # JWT verification
- │   ├── model/
- │   │   └── user.model.js       # User schema
- │   ├── routes/
- │   │   └── user.route.js       # API routes
- │   ├── index.js
- │   ├── contracts.js              #Database name
- │   └── app.js                  # Express app setup
- ├── public/
- │   │   ├── css/
- │   │   │   └── style.css       # Custom CSS
- │   │   ├── index.html          # Home page
- │   │   ├── login.html          # Login page
- │   │   └── register.html       # Registration page
- │   └── js/
- │   │   ├──auth.js
- │       └── app.js           # Frontend logic (if any)
- ├── .env                      # Environment variables
- ├── .prettier
- ├── .gitignore                  # Ignored files and folders
- ├── package.json                # Node.js dependencies
- └── README.md                   # Documentation (this file)


### Important Notes
- **Database Connection**: Ensure your MongoDB instance is running, and the URI in .env is correct.
- **Environment Variables**: Never share your .env file publicly.
- **Security**: Use HTTPS and secure cookies for production deployment.
