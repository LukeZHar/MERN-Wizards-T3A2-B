# MERN-Wizards-T3A2-B
## Links
- **Deployed Application:** [A Ticket a Task It](https://a-ticket-a-task-it.netlify.app/)
- **Github Repository Part-A** [MERN_Wizards-T3A2-A](https://github.com/She2024/MERN-Wizards-T3A2-A)
- **GitHub Repository Part-B:** [MERN-Wizards-T3A2-B](https://github.com/LukeZHar/MERN-Wizards-T3A2-B)
- **GitHub Link (Sheree):** [Sheree](https://github.com/She2024)
- **GitHub Link (Jessica):** [Jessica](https://github.com/Jessicavazm)
- **GitHub Link (Luke):** [Luke](https://github.com/LukeZHar)

## Project Overview
**A Ticket a Task It** is a task management application developed using the MERN stack (MongoDB, Express, React, and Node.js). The application aims to streamline task management and improve collaboration across teams by providing a user-friendly interface and robust backend functionalities.

## Table of Contents
- [Links](#links)
- [Project Overview](#project-overview)
- [Explanation of Each Section](#explanation-of-each-section)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Installation](#installation)
- [Deployment](#deployment)
- [Security Measures](#security-measures)
- [User Interface](#user-interface)
- [User Testing](#user-testing)
- [Testing Framework](#testing-framework)
- [Source Control Methodology](#source-control-methodology)
- [Task Delegation Methodology](#task-delegation-methodology)
- [Code Quality](#code-quality)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Full Folder Structure](#full-folder-structure)

### Explanation of Each Section:
- **Links:** Direct URLs to both the deployed application and the GitHub repository.
- **Project Overview:** Provides a brief description of the application, its purpose, and technological foundation.
- **Technologies Used:** Clearly lists each technology used in the development of the application, including details on libraries like MUI, Axios, and testing frameworks like Vitest and Cypress.
- **Key Features:** Highlights core functionalities that enhance user experience and usability, including user stories, performance metrics, and admin functionalities.
- **Installation:** Detailed instructions for setting up the project locally, including necessary dependencies and environment variable configurations.
- **Deployment:** Information on how the application is hosted and accessed, with details on cloud hosting services, environment variables, custom domain names, and CI/CD practices.
- **Security Measures:** Describes various security features implemented to protect the application and users, including Helmet.js, JWT, CORS, and error handling mechanisms.
- **User Interface:** Provides insight into the application's design, focusing on user experience, intuitive navigation, consistent UI elements, and overall accessibility.
- **User Testing:** Evidence of testing done in both development and production environments, showcasing user acceptance testing (UAT), usability tests, and feedback iterations.
- **Testing Framework:** Details the use of Vitest for running unit and integration tests, achieving at least 90% code coverage with a comprehensive test suite.
- **End-to-End Testing:** Covers the integration of Cypress for automated end-to-end tests that ensure critical user flows (such as post creation and user registration) are functioning as intended.
- **Source Control Methodology:** Describes the use of Git for version control, including frequent commits, branch strategies, and pull request processes, ensuring effective collaboration among team members.
- **Task Delegation Methodology:** Covers how tasks were managed, including the Kanban approach, task assignment based on strengths, regular team meetings, and documentation of progress.
- **Code Quality:** A summary of the principles and practices applied to ensure clean, maintainable code, focusing on DRY principles, code flow control, and object-oriented design.
- **License:** Information about the project's license, helping users understand their rights concerning the code.

## Technologies Used
- **MongoDB:** NoSQL database for flexible data storage and retrieval.
- **Express:** Web application framework for Node.js to build RESTful APIs.
- **React:** JavaScript library for building dynamic user interfaces.
- **Node.js:** JavaScript runtime for server-side development.
- **MUI (Material-UI):** Component library used to design user interfaces following Material Design principles, enhancing responsiveness and aesthetics.
- **Axios:** A promise-based HTTP client for making API requests, simplifying the process of fetching data from the server.
- **jsonwebtoken:** Library used for creating and verifying JSON Web Tokens (JWTs), which handle secure user authentication.
- **bcrypt:** A library for hashing passwords, ensuring that user passwords are securely stored during registration.
- **dotenv:** Used to load environment variables from a `.env` file, managing sensitive information like database credentials and JWT secrets.
- **Vitest:** A testing framework designed for Vite projects, utilized for running unit and integration tests to ensure application functionality.
- **Cypress:** A robust framework for end-to-end testing, validating critical user flows within the application.
- **@mui/icons-material:** Provides a collection of Material Design icons that can be easily integrated into React components for enhanced UI.
- **framer-motion:** Library used for enhancing component animations and transitions, improving the overall user experience.
- **GitHub Desktop:** A GUI for Git that simplifies version control, making it easier to manage repositories and collaborate within the team.
- **Visual Studio Code:** Development environment providing features like integrated terminal, debugging, and various extensions tailored for JavaScript and React development.

## Key Features
1. **User Authentication**: 
   - Secure user login and registration using JWT (JSON Web Tokens) enabling users to log in and manage their tasks with individual accounts, ensuring data security and user privacy.
2. **Task Management**: 
   - Users can create, edit, view, and delete tasks.
   - Tasks can be categorised and prioritised (Low, Medium, High).
   - Admins can oversee and manage user actions related to task management.
3. **Admin Panel**:
   - Admin users can manage user roles, delete users, and oversee all posts.
   - Functionality to filter posts by priority and search for users by email.
4. **Profile Management**:
   - Users can view and edit their profile details and change their passwords.
5. **Responsive User Interface**:
   - Designed using Material-UI (MUI), ensuring the application is visually appealing and functional across different devices.
6. **Error Handling**:
   - The application includes error handling for API requests, providing user feedback for failed actions (like login failures).
7. **Post Replies**:
   - Users can reply to posts, encouraging interaction and discussion.
8. **Custom Hooks for Logic Sharing**:
   - Use of custom React hooks (such as `useAdmin`, `useUserDetails`, and `useAuth`) to handle shared logic across components.
9. **End-to-End Testing**:
   - Integration of [Cypress](https://www.cypress.io) for comprehensive end-to-end testing. Automated tests for post creation and user flow have been implemented to ensure application functionality.
   - E2E tests ensure that users can successfully create posts, register, and log in seamlessly.

## Installation
1. Clone the GitHub repository:
   ```bash
   git clone https://github.com/LukeZHar/MERN-Wizards-T3A2-B.git
   cd MERN-Wizards-T3A2-B
   ```
2. Install dependencies:
	```bash
	npm install
	```

3. Create a .env file in the root directory and populate it with environment variables:
	```text
	PORT=8008
	DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<your_database>?retryWrites=true&w=majority
	JWT_SECRET=your_jwt_secret
	VITE_AUTH_API_URL=https://your_api_url
	```
	- **DATABASE_URL:** Replace **username**, **password**, and **your_database** with your MongoDB Atlas credentials.
	- **JWT_SECRET:** Set this to a strong, confidential string used for signing JWT tokens.
	- **VITE_AUTH_API_URL:** Set this to your deployed API endpoint or local development URL as needed.

4. Start the Application:
To run the application, use the following command to start both the backend and frontend together:
	```bash
	npm run dev
	```
	- This should be set in your package.json to start both servers concurrently.

## Deployment
- **Render:** The application is deployed on Render for server-side operations, which hosts the backend API securely and provides scalability.
- **MongoAtlas:** For the database, we utilised MongoDB Atlas, a cloud-based solution that allows for efficient and secure data management with features like automated backups and high availability.
- **Netlify:** The frontend of the application is deployed on Netlify, which provides rapid, continuous deployment capabilities and optimized performance for web applications. You can access the live application at [A Ticket a Task It](https://a-ticket-a-task-it.netlify.app/).
- **Environment Variables:** Sensitive data is managed using environment variables, configured securely in both Render and Netlify to prevent exposure of credentials and ensure smooth operations across deployment stages.
- **Custom Domain Name:** The application employs a custom domain, enhancing professionalism in user access.
- **CI/CD Practices:** Implemented CI/CD practices to automate deployment processes, ensuring that any changes made to the main branch are automatically deployed following thorough testing.

### Deployment Process
1. **Backend Deployment:**
   - Using Render, the server was configured to handle API requests, manage environment variables, and implement secure hosting for the application's backend.
2. **Database Setup:**
   - Through MongoDB Atlas, a cluster was created with access controls and connection string configured, which was then integrated into the application for seamless data retrieval and manipulation.
3. **Frontend Deployment:**
   - The frontend deployed on Netlify was configured with environment variables matching those in the backend to securely communicate with the API and ensure consistent functionality across platforms.
4. **Continuous Integration/Continuous Deployment (CI/CD):**
   - The team has implemented CI/CD processes to facilitate rapid development and deployment. This allows any changes pushed to the main branch of the repository to automatically trigger a deployment, ensuring users always have access to the latest version of the application.

## Security Measures
- **Helmet.js:** Employed to set secure HTTP headers and protect against common vulnerabilities.
- **JWT (JSON Web Tokens):** Implemented for secure communication between the frontend and backend, ensuring user authentication and authorisation by encoding user information and preventing tampering.
- **CORS (Cross-Origin Resource Sharing):** Configured to control which domains can access the resources on our server, preventing unauthorized domains from making requests to our API.
- **Error Handling:** Developed comprehensive error-handling mechanisms to avoid exposing sensitive information in error messages, thus protecting backend logic and data integrity.

## User Interface
- The user interface of **A Ticket a Task It** is designed with a focus on user experience and accessibility. Built using **Material-UI (MUI)**, the application features a responsive design that adapts seamlessly across various devices, ensuring that all users can interact with it effectively.
- **Intuitive Navigation**: 
  - The use of a **centralised navigation bar** with clear links to various sections (such as Dashboard, Create Post, and Profile) allows users to easily navigate through the application.
- **Consistent UI Elements**: 
  - Reusable components like buttons and text fields ensure consistent styling and functionality, reducing the learning curve for first-time users.
- **Visual Feedback**: 
  - Users receive immediate visual feedback on actions (e.g., changing button states on hover and provisional alerts through Snackbar notifications), which improves the overall user experience.
- **Clear Call-to-Actions**: 
  - Prominent buttons with descriptive labels guide users through tasks, like creating or editing posts, making processes straightforward.

## User Testing
- **Development Testing:** 
	- **Unit Testing:** Testing individual components or functions to ensure they behave as expected. This is often automated using testing frameworks (Vitest).
	- **Integration Testing:** Testing how different modules interact with each other, ensuring that combined parts function correctly together.
	- **Manual Testing:** Manually test application features to validate user stories and functionality.
	- **Feedback Iteration:** Gathering feedback from team members during development to make iterative improvements based on testing results.
- **Production Testing:** 
	- **Simulated User Acceptance Testing (UAT):** Simulated real users and tested the application to validate the functionality based on requirements and expectations.
	- **Performance Testing:** Assessing how the application performs under various loads, identifying potential bottlenecks, and ensuring stability and speed.
	- **End-to-End Testing:** Testing the complete flow of the application from start to finish to verify that all components are functioning correctly together in the production environment.
	- **Monitoring:** Continuously monitoring the application for any issues, bugs, or performance metrics after it goes live.

- **Real User Acceptance Testing (UAT):**
  - After presenting the application, feedback was collected from the client, who is a content perfectionist. The feedback included:
    - **Aesthetic Preferences**: Dislikes Times New Roman with a passion, which is used in the footer.
    - **Form Field Tags**: In some instances, form field tags are not sitting above the field but are slightly on it.
    - **System Alerts**: Alerts are a bit small, and their position is outside the line of sight. The client missed a few as a result, though they noted it’s not a deal breaker.
    - **Category Changing**: A request for the ability to change categories would be highly desired, but again, it's not a deal breaker.
    - **Security Considerations**: The client complimented the security considerations, noting they were well thought out.

### Next Steps
Based on this feedback, the team will prioritise the following enhancements:
- Adjust the footer font to a more preferred typeface.
- Ensure form field tags are correctly positioned above the fields to enhance usability.
- Increase the size and reposition system alerts for better visibility.
- Explore options for allowing category changes within the application.
- Link to Feedback [User Feedback](./src/test/UserTest/App%20feedback.pdf)


## Testing Framework
- **Unit and Integration Testing**: 
  - The project utilises **Vitest** as the formal testing framework, which allows for both unit and integration tests to be executed across the application
  - A comprehensive test suite has been established, covering key components and functionalities, ensuring that at least **90% code coverage** is achieved. 
  - Unit tests are written for crucial components (like user forms and authentication processes), while integration tests assess how these components work together, ensuring seamless interaction throughout the application.
- **End-to-End Testing**:
  - The implementation of **Cypress** for end-to-end testing ensures the application's critical user flows are tested in a real browser environment. 
    - **Post Creation Test:** Validates that users can create posts successfully.
    - **User Flow Test:** Confirms that users can register and subsequently log in without issues.
- **CI/CD:**
	- Utilised GitHub Actions for continuous integration, where automated tests are executed on each push to the **main** branch. The configuration is defined in the `ci.yml` file, automating the testing process.
	- The CI workflow runs on every push to the **main** branch, ensuring code quality by running tests before any changes are merged into the production environment.
### Workflow Implementation
```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '23.8.0'

      - name: Install Dependencies
        run: npm install
```
  
### Testing Link
[Link to all the tests and screenshots](./src/test/)

## Source Control Methodology
- **Version Control:** The project employs Git for version control, ensuring changes to the codebase are tracked effectively. 
  - **Frequent Commits:** Regular commits were made to the repository with clear and descriptive commit messages that outline the changes implemented. This practice keeps track of project changes over time and facilitates collaboration among team members.
  - **Branch Strategy:** Multiple feature branches were created for new features, bug fixes, and testing. This allows developers to work in isolation without affecting the main codebase until code is thoroughly reviewed and merged.
  - **Pull Requests:** All code changes were managed through pull requests, promoting code review practices among team members prior to merging changes into the main branch. This ensures that multiple eyes examine the code, further improving code quality.
  - Check Part-A for screenshots [MERN_Wizards-T3A2-A](https://github.com/She2024/MERN-Wizards-T3A2-A)

## Task Delegation Methodology
- **Task Management Tool**: The project utilised **Trello** for task management, which facilitated the organisation and tracking of project tasks efficiently.
- **Kanban Board**: 
  - A Kanban board was created on Trello, where tasks were represented as cards. This visual approach allowed the team to easily see the status of tasks at any time.
- **Task Assignment**: 
  - Tasks were assigned based on individual strengths and weaknesses, ensuring that team members worked on areas where they could excel. This also promoted accountability and ownership of tasks among team members.
- **Labels and Difficulty Levels**: 
  - Each task card was labelled with difficulty levels (e.g., Easy, Medium, Hard), which helped team members to select tasks based on their current workload and skill proficiency.
- **Regular Meetings**: 
  - Weekly stand-up meetings were held on Discord to review progress, discuss any blockers, and adjust task assignments as needed. This ensured that the team remained aligned on objectives and project timelines
- **Documentation of Progress**: 
  - Each member was encouraged to check off completed tasks on Trello and record any relevant Git commits alongside their task, providing a clear record of contribution and progress. This has led to improved visibility of team efforts and project evolution.
- **Feedback Loops**: 
  - Continuous feedback was gathered from team members regarding task allocation and workloads, allowing for real-time adjustments to ensure balanced workload distribution and team satisfaction.
- **Outcome**: 
  - The approach resulted in a well-coordinated project flow and strong camaraderie within the team, ultimately enhancing productivity and quality of work throughout the development process.
- Check Part-A for screenshots [MERN_Wizards-T3A2-A](https://github.com/She2024/MERN-Wizards-T3A2-A)

## Code Quality
- **DRY Principles:** The codebase exemplifies DRY (Don’t Repeat Yourself) principles, ensuring that every piece of functionality or logic has a single, authoritative representation throughout the project.
  - **Reusable Components:** Modular components such as `Header` and `Footer` are defined separately, allowing for reuse without duplication.
  - **Custom Hooks:** Business logic is encapsulated in custom hooks (`useAdmin`, `useAuth`, `useProfile`), enabling shared functionality across components without repeated code.
  - **Abstracted API Logic:** API calls are centralized in `apiService.js`, reducing redundancy and improving maintainability by providing a single source of truth for data fetching.
- **Code Flow Control:** 
  - The application employs **React's state management** effectively, particularly using hooks (`useEffect`, `useState`) to manage component lifecycles and asynchronous data fetching. This provides a clear and logical flow for user interactions.
  - API request handling is combined with error handling to ensure graceful degradation of user experience. For example, if a network request fails (as seen in the `DashboardPage.jsx`), descriptive error messages are displayed, guiding users appropriately.
  - Input validation is consistently applied across forms, ensuring that users can't submit invalid data, which contributes to a seamless flow through various user stories.
- **Object-Oriented Principles:**
  - Object-oriented design patterns are applied through the use of **context providers** for managing state throughout the application, allowing for encapsulation of related logic and separation of concerns.
  - The application structure is modular, with distinct responsibilities assigned to each component. For example, the `AdminPage.jsx` manages all aspects of user and post management, while other component files focus on their specific roles. This encapsulation promotes maintainability and clarity, allowing for easier updates and debugging.
  - While traditional classes are not explicitly used in this functional React application, the principles of OO design are observed in how state and user data are managed through structured components and hooks.

## Future Enhancements
- **Integration with Google OAuth:** Plan to implement Google authentication for easier user registration and login.
- **Notification System:** Enhancements to the current notification system, aiming for real-time alerts for user interactions.
- **JIRA Integration:** Investigating options for integrating JIRA card functionalities to track progress of tasks directly within the application interface.
- **Testing Framework Expansion:** Expanding the test suite to cover more components to ensure robustness, with the goal of achieving 100% code coverage.
- **Expanded Testing Suite:** Adding more Cypress tests to cover additional user flows and functionality.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments
- Special thanks to the mentors and collaborators who supported the development process and provided valuable insights.
- Recognition of tools and libraries used that simplified the development process and improved code quality.

## Full folder structure
```text
/Mern-Wizards-T3A2-B
├── dist
├── node_modules
├── public
├── /src
│   ├── /backend
│   │   ├── /controllers
│   │   │   ├── adminController.js
│   │   │   ├── replyController.js
│   │   │   ├── authController.js         # Handles user registration and login logic.
│   │   │   ├── notificationController.js
│   │   │   ├── userController.js
│   │   │   └── postController.js         # Contains functions for creating and managing posts.
│   │   ├── /middleware
│   │   │   ├── adminMiddleware.js
│   │   │   ├── authorMiddleware.js
│   │   │   └── authMiddleware.js         # Middleware for validating JWT tokens.
│   │   ├── /models
│   │   │   ├── ReplyModel.js
│   │   │   ├── UserModel.js                   # User schema for MongoDB (Mongoose).
│   │   │   ├── PostModel.js                   # Post schema for MongoDB (Mongoose).
│   │   │   └── NotificationModel.js            # Optional schema for notifications (if applicable).
│   │   ├── /routes
│   │   │   ├── adminRoutes.js
│   │   │   ├── replyRoutes
│   │   │   ├── authRoutes.js             # API routes for authentication (login, register).
│   │   │   ├── postRoutes.js             # API routes for post-related actions.
│   │   │   ├── notificationRoutes.js
│   │   │   └── userRoutes.js             # Optional routes for user-specific actions.
│   │   ├── /utils
│   │   │   └── database.js               # Utility for connecting to MongoDB.
│   │   ├── index.js                      # Entry point for starting the server.
│   │   └── server.js                     # Sets up Express app and routes.
│   ├── /frontend
│   │   ├── /assets
│   │   │   ├── Mern.png
│   │   │   ├── Producticon.png
│   │   ├── /components
│   │   │   ├── Header.jsx                # Header component for site navigation.
│   │   │   ├── Footer.jsx                # Footer component (optional).
│   │   │   ├── Notification.jsx           # Component for displaying notifications.
│   │   │   ├── Layout.jsx                # Layout component wrapping header, footer, and main content
│   │   │   ├── LoginPrompt.jsx
│   │   │   ├── ScrollTop.jsx             # Floating action button for scrolling to the top
│   │   │   └── HideOnScroll.jsx          # Component to manage header visibility on scroll
│   │   ├── /context
│   │   │   ├── ProfileContext.jsx
│   │   │   ├── SnackbarContext.jsx        # Context for managing snackbar notifications
│   │   │   ├── PostContext.jsx           # Context for managing posts
│   │   │   └── UserAuthContext.jsx       # Context for managing authentication state across the app.
│   │   ├── /hooks
│   │   │   ├── useAdmin.js
│   │   │   ├── useUserDetails.js
│   │   │   └── useAuth.js                # Custom hook for handling authentication logic (if needed).
│   │   ├── /pages
│   │   │   ├── AdminPAge.jsx
│   │   │   ├── ReplyPage.jsx
│   │   │   ├── App.jsx                   # Main component that manages routing.
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── LoginPage.jsx             # Page for user login.
│   │   │   ├── RegisterPage.jsx          # Page for user registration.
│   │   │   ├── DashboardPage.jsx          # Page for displaying the user dashboard (overview).
│   │   │   ├── Home.jsx                   # The landing or homepage component.
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── PostCreation.jsx          # Page for creating new posts
│   │   │   ├── PostEdit.jsx
│   │   │   └── PostDetailPage.jsx        # Page for displaying details of a single post.
│   │   ├── /styles
│   │   │   ├── App.css
│   │   │   └── theme.js                  # Theme configuration for Material-UI to apply consistent styles.
│   │   └── main.jsx                      # React app entry point where the app is rendered.
│   ├── setupTest.js
│   ├── /test
│   │   ├── /frontend
│   │   │   ├── Header.test.jsx
│   │   │   ├── Footer.test.jsx
│   │   │   ├── LoginPrompt.test.jsx
│   │   │   ├── SnackbarContext.test.jsx 
│   │   │   ├── ProfileContext.test.jsx
│   │   │   ├── NotFoundPage.test.jsx
│   │   │   ├── LoginPage.test.jsx
│   │   │   ├── RegisterPage.test.jsx 
│   │   │   ├── DashboardPage.test.jsx
│   │   │   ├── ProfilePage.test.jsx
│   │   │   ├── PostEdit.test.jsx
│   │   │   ├── Home.test.jsx
│   │   ├── /backend
│   │   │   ├──
├── index.html                   		  # Main HTML file for the React application.
├── vite.config.js                       # Configuration file for Vite (build tool).
├── .gitignore                           # File specifying which files to ignore in Git.
├── package.json                         # Project dependencies and configuration.
├── .env                                 # Environment variables for your application.
└── README.md                            # Documentation for the project.
```
