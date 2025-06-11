#### **Project Title**  
**MERN Stack CRUD Application** – A dynamic web app with Zustand state management,JWT,bcrypt and Chakra UI among others.  

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://mern-project-zl0e.onrender.com)

#### **🔹 Key Features**  
✅ **Full CRUD Operations** – Create, read, update, and delete data via a React frontend and Node.js API.  
✅ **Modern State Management** – Used **Zustand** to handle global state (e.g., form data, UI toggles).  
✅ **Responsive UI** – Built with **Chakra UI** for clean, reusable components (modals, forms, alerts).
✅ **Authentication** – Created using **JWT and bcryptjs** for logging into the web application and signing in for first time users.

#### **🔹 Tech Stack**  
- **Frontend**: React, Zustand, Chakra UI
- **Backend**: Node.js, Express, MongoDB  
- **Tools**: Postman (API testing), Git, VSCode
- **Security**: bcryptjs, jsonwebtoken, cookie-parser, cors
- **Build Tool**: Vite
- **Environment & Config**: dotenv (environment variables),cross-env (environment variables across platforms)
- **Development Environment**:Visual Studio Code (IDE),Git (version control),npm (package manager)

### **🤝 Inviting Contributors (README.md Section)**  
#### **🔹 Want to Contribute?**  
I welcome improvements, bug fixes, or new features! Here’s how to get started:  

1. **Fork the repo** and clone it locally:  
   ```bash
   git clone https://github.com/SachinPrab/mern-project.git
   ```
   
2. **Create a branch** for your changes:  
   ```bash
   git checkout -b feature/your-feature-name
   ```  
3. **Commit and push** your changes, then open a **Pull Request** with a clear description.  

#### **🔹 First-Time Contributors Welcome!**  
- Need help? DM me or comment on an issue!  

#### **🔹 Collaboration Guidelines**  
- **Code Style**: Follow existing patterns (e.g., Chakra UI for components, Zustand for state).  
- **Testing**: Test API endpoints in Postman and UI interactions manually.  
- **Documentation**: Update the README if adding new features.

## 🧠 Backend Knowledge Summary (MERN Stack)

I’ve built a full-fledged backend using the **MERN stack**, with a strong understanding of **RESTful API development** using **Express.js** and **MongoDB**. I structured the codebase following the **MVC architecture**, organizing logic into separate folders for **controllers**, **models**, and **routes** to maintain modularity and clean separation of concerns. The **MongoDB connection** logic is isolated in a `db.js` file inside the `config` folder, using **Mongoose** to define schemas and interact with the database.

I’ve also implemented JWT-based authentication, allowing users to sign up, log in, and log out securely. Passwords are hashed with bcryptjs, and jsonwebtoken is used to sign and verify tokens. Authentication state is managed using HTTP-only cookies, providing a secure and scalable solution for session management.

I've also used 
**React(with Vite as build tool),
React Router DOM (for routing) and
Axios (for HTTP requests)** as well as used **Zustand** for state management and **ContextAPI** for auth state.

I’ve implemented all asynchronous operations using `async/await` within `try/catch` blocks for proper **error handling** and reliability. Sensitive configuration details like database URIs are stored in environment variables using **dotenv** to keep them secure. I also successfully **deployed** the application to **Render** after pushing the code to **GitHub**, and connected it to a live **MongoDB Atlas** instance.

I can confidently explain how each part of the backend interacts and contributes to the overall functionality of the application.

⚠️ Note: This project is currently using a hardcoded localhost API for backend access, which will cause login errors unless run locally with the backend server active. Planned improvement: switch to environment-based API URLs for production support.
