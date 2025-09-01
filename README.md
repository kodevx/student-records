📚 Student Records Management System

The Student Records Management System is a Full Stack web application designed to manage and maintain student records efficiently. The project follows a client–server architecture, where the frontend is developed using Next.js, the backend API is powered by Java Spring Boot, and PostgreSQL serves as the database.

🔹 Features

Student Management
 - Add new students with details (name, email, phone, department, etc.).
 - View all student records in a paginated and searchable list.
 - Update student details when required.
 - Delete student records safely.

Data Validation & Error Handling
 - Validates student details on both frontend and backend.
 - Proper error messages for invalid inputs.

Built with Next.js for fast, SEO-friendly, and mobile-responsive design.


This system enables users to perform CRUD (Create, Read, Update, Delete) operations on student records in a seamless and secure manner.


🔹 Tech Stack

Frontend (Next.js)

 - React-based framework for building modern, performant, server-side rendered web apps.

 - Axios/Fetch API to communicate with the backend.

 - Tailwind CSS

Backend (Spring Boot)

 - RESTful API built with Java Spring Boot.

Endpoints for CRUD operations:

 - POST /students/add → Create a student.

 - GET /students → Retrieve all students.

 - GET /students/search? → Retrieve a student by name/age/major/id.

 - PUT /students/{id} → Update student details.

 - DELETE /students/{id} → Delete student.

Business logic & data validation.

Error handling and structured responses.

Database (PostgreSQL)

 - Relational database to persist student records.

🔹 System Architecture

Frontend (Next.js) → Sends HTTP requests to backend API.

Backend (Spring Boot) → Processes requests, interacts with database.

Database (PostgreSQL) → Stores student data persistently.

Flow Example:

User fills out "Add Student" form → Next.js sends POST request to /students → Spring Boot validates & stores in PostgreSQL → Confirmation returned → UI updates with new student record.
