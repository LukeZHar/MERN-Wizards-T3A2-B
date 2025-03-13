# MERN-Wizards-T3A2-B
## Links
- **Deployed Application:** [A Ticket a Task It]()
- **Github Repository Part-A** [MERN_Wizards-T3A2-A](https://github.com/She2024/MERN-Wizards-T3A2-A)
- **GitHub Repository Part-B:** [MERN-Wizards-T3A2-B](https://github.com/LukeZHar/MERN-Wizards-T3A2-B)
- **GitHub Link** [Sheree](https://github.com/She2024)
- **Github Link** [Jessica](https://github.com/Jessicavazm)
- **Github Link** [Luke](https://github.com/LukeZHar)

## Project Overview
**A Ticket a Task It** is a task management application developed using the MERN stack (MongoDB, Express, React, and Node.js). The application aims to streamline task management and improve collaboration across teams by providing a user-friendly interface and robust backend functionalities.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Installation](#installation)
- [Deployment](#deployment)
- [Security Measures](#security-measures)
- [User Testing](#user-testing)
- [Task Management](#task-management)
- [Code Quality](#code-quality)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Explanation of Each Section](#explanation-of-each-section)
- [Acknowledgments](#acknowledgments)

## Technologies Used
- **MongoDB:** NoSQL database for flexible data storage and retrieval.
- **Express:** Web application framework for Node.js to build RESTful APIs.
- **React:** JavaScript library for building dynamic user interfaces.
- **Node.js:** JavaScript runtime for server-side development.
- **MUI:** Material-UI component library used to design user interfaces following Material Design principles, enhancing responsiveness and aesthetics.
- **Visual Studio Code:** Development environment providing features like integrated terminal, debugging, and various extensions tailored for JavaScript and React development.
- **GitHub Desktop:** A GUI for Git that simplifies version control, making it easier to manage repositories and collaborate within the team.


## Key Features
- **User Authentication:** Utilises JWT for secure user authentication, enabling users to log in and manage their tasks with individual accounts, ensuring data security and user privacy.
- **Task Management:** Users can create, edit, and delete tasks with the ability to categorise and prioritise them based on urgency, helping them stay organised and focused.
- **Admin Panel:** Admins can manage user accounts, including updating roles, deleting users, and overseeing task activities, granting administrators the oversight necessary for smooth operation.
- **Responsive Design:** Built using Material-UI (MUI), the application provides an attractive and consistent user interface across all devices, enhancing accessibility for users.

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
- **Netlify:** The frontend of the application is deployed on Netlify, which provides rapid, continuous deployment capabilities and optimized performance for web applications. Visit A Ticket a Task It to access the live application.

## Security Measures
- **Helmet.js:** Employed to set secure HTTP headers and protect against common vulnerabilities.
- **JWT (JSON Web Tokens):** Implemented for secure communication between the frontend and backend, ensuring user authentication and authorisation by encoding user information and preventing tampering.
- **CORS (Cross-Origin Resource Sharing):** Configured to control which domains can access the resources on our server, preventing unauthorized domains from making requests to our API.
- **Error Handling:** Developed comprehensive error-handling mechanisms to avoid exposing sensitive information in error messages, thus protecting backend logic and data integrity.

## User Testing
- **Development Testing:** 
	- **Unit Testing:** Testing individual components or functions to ensure they behave as expected. This is often automated using testing frameworks (Vitest).
	- **Integration Testing:** Testing how different modules interact with each other, ensuring that combined parts function correctly together.
	- **Manual Testing:** Manually test application features to validate user stories and functionality.
	- **Feedback Iteration:** Gathering feedback from team members during development to make iterative improvements based on testing results.
- **Production Testing:** 
	- **User Acceptance Testing (UAT):** Simulated real users and tested the application to validate the functionality based on requirements and expectations.
	- **Performance Testing:** Assessing how the application performs under various loads, identifying potential bottlenecks, and ensuring stability and speed.
	- **End-to-End Testing:** Testing the complete flow of the application from start to finish to verify that all components are functioning correctly together in the production environment.
	- **Monitoring:** Continuously monitoring the application for any issues, bugs, or performance metrics after it goes live.

## Testing Framework
- **Unit and Integration Testing:** 
  - The project utilises **Vitest** as the formal testing framework, along with **Testing Library** for React components. A comprehensive test suite has been established, covering both unit tests for individual components and integration tests for overall functionality.

[Link to all the tests and screenshots](./src/test/)

## Task Management
The project utilised **Trello** for task management, allowing our team to efficiently organise, prioritise, and track tasks. Tasks were assigned based on team strengths and availability, ensuring a smooth workflow and effective collaboration throughout the project lifecycle.

## Code Quality
- **DRY Principles:** The codebase exemplifies DRY (Don’t Repeat Yourself) principles, ensuring that every piece of functionality or logic has a single, authoritative representation throughout the project.
- **Code Flow Control:** Flawless code flow is demonstrated by a logical and seamless execution path for all user stories, providing a structured user experience.
- **Object-Oriented Principles:** Object-oriented patterns, such as modular design and encapsulation, have been applied to enhance the application's maintainability and serviceability, resulting in cleaner code that is easier to understand and modify.

## Future Enhancements
- **Integration with Google OAuth:** Plan to implement Google authentication for easier user registration and login.
- **Notification System:** Enhancements to the current notification system, aiming for real-time alerts for user interactions.
- **JIRA Integration:** Investigating options for integrating JIRA card functionalities to track progress of tasks directly within the application interface.
- **Testing Framework Expansion:** Expanding the test suite to cover more components to ensure robustness, with the goal of achieving 100% code coverage.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

### Explanation of Each Section:
- **Links:** Direct URLs to both the deployed application and the GitHub repository.
- **Project Overview:** Provides a brief description of the application, its purpose, and technological foundation.
- **Table of Contents:** Easier navigation to various sections of the README.
- **Technologies Used:** Clearly lists each technology used in the development of the application.
- **Key Features:** Highlights core functionalities that enhance user experience and usability.
- **Installation:** Detailed instructions for setting up the project locally, including the necessary dependencies.
- **Deployment:** Information on how the application is hosted and accessed.
- **Security Measures:** Describes various security features implemented to protect the application and users.
- **User Testing:** Evidence of testing done in both development and production environments.
- **Task Management:** Details on how tasks were organized and assigned within the team to ensure project efficiency.
- **Code Quality:** A summary of the principles and practices applied to ensure clean, maintainable code.
- **License:** Information about the project's license, helping users understand their rights concerning the code.

## Acknowledgments
- Special thanks to the mentors and collaborators who supported the development process and provided valuable insights.
- Recognition of tools and libraries used that simplified the development process and improved code quality.


R2: Write well designed code that does each of the following:
	- Separates the program into modules that each deal with one particular focus, or concern
	- Demonstrates DRY (Don’t Repeat Yourself) coding principles
Uses appropriate libraries
	- Demonstrates good code flow control for user stories
Applies Object Oriented (OO) principles/patternsUses appropriate data structures

R3: Employ and utilise proper source control methodology (git)

R4: Demonstrate your ability to work in a team through the following techniques:
	- Use a recognised project management methodology
	- Use a recognised task delegation methodology

R5: Produce a working application that meets client and user needs

R8: Provides evidence of user testing:
	- In the development environment
	- In the production environment

R9: Utilises a formal testing framework

------------------------------------------------

## Marking guide 
CMP1003-1.1: Demonstrate DRY (Don’t Repeat Yourself) principles in all code.
6 to >5 pts
HD
Excellent use of DRY principles, every piece of knowledge has a single, unambiguous, authoritative representation

CMP1003-1.2: Appropriate use of libraries used in the app
6 to >5 pts
HD
Excellent use of libraries and a complete and detailed description of libraries used in the app

CMP1002-2.1: Demonstrate code flow control
6 to >5 pts
HD
Flawless code flow control

CMP1002-2.2: Apply Object oriented principles/patterns
6 to >5 pts
HD
Superior use of object oriented principles/patterns; use of OO principles/patterns throughout application with positive impact on code maintainability and serviceability

CMP1002-4.1: Employ and utilise proper source control methodology
6 to >5 pts
HD
Meets D criteria and demonstrates frequent commits, merges and pull requests from all team members
5 to >4.5 pts
D
Meets CR criteria and uses multiple feature branches with commits from all team members
4.5 to >4 pts
CR
Meets P criteria and has README and gitignore with appropriate content
4 to >2.99 pts
P
Basic use - Project files exist on a git repo

CMP1003-6.2: Employ and utilise project management methodology
6 to >5 pts
HD
Simple and clear standards for planning methodology chosen and adhered to

CMP1002-3.1: App functionality
6 to >5 pts
HD
Builds an outstanding application, that meets client and user needs and exceeds expectations

CMP1002-4.2: Deployment
6 to >5 pts
HD
Successfully deploys to a cloud hosting service, uses environment variables, use same database type in development/testing as production, uses custom domain name

CMP1002-3.2: User interface
6 to >5 pts
HD
User-interface is highly intuitive, with no impediments to user flow

CMP1002-5.1: Development testing
6 to >5 pts
HD
Evidence of extensive user-testing of development site

CMP1002-5.2: Production testing
6 to >5 pts
HD
Evidence of extensive user-testing of production site, including by client

CMP1002-5.3: Utilises a formal testing framework
6 to >5 pts
HD
Comprehensive test suite including both unit and integration tests in both backend and frontend, with at least 90% code coverage

CMP1002-7.4: Employ and utilise task delegation methodology
6 to >5 pts
HD
Meets D with project results demonstrating consideration of strength and weaknesses of team members and project/team conditions
5 to >4.5 pts
D
Excellent use of task delegation with Kanban board of tickets assigned to team members labelled with difficulty level and corresponding Git commits

