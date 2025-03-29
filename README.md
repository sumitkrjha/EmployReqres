# Employ.Reqres

Employ.Reqres is a web application built with Vite, React.js, and Tailwind CSS. It utilizes Redux for state management and React Hot Toast for displaying success and error messages. The app interacts with the Reqres API to perform CRUD operations on users.

![Home](https://github.com/user-attachments/assets/a553603f-be7e-4657-ab92-1a0be8d57279)


## Hosting at : https://employ-sumit.onrender.com

## Features

- **User Listing**: Fetches and displays users from the Reqres API.
- **Pagination Support**: Displays 3 users per page with navigation controls.
- **Edit User**: Users can update their details.
- **Delete User**: Removes a user upon confirmation.
- **State Management**: Redux Toolkit manages application state.
- **Notifications**: React Hot Toast provides instant feedback for actions.
- **Responsive UI**: Styled with Tailwind CSS for a modern and mobile-friendly design.

## Screenshots

### Sign In
![signin](https://github.com/user-attachments/assets/900938d2-939b-48fb-8d43-c23ac3dcbddc)

### Home
![Home](https://github.com/user-attachments/assets/351240b0-91a0-4c0f-afe5-20ee739babca)

### Pagination
![pagination](https://github.com/user-attachments/assets/c5aac6ee-e688-43c1-96f7-6fee7f09560c)

### Edit
![Edit](https://github.com/user-attachments/assets/c1215ed0-fe06-4b15-8de5-3950086c9a0a)


## Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Notifications**: React Hot Toast
- **API**: Reqres API

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/sumitkrjha/EmployReqres.git
   cd EmployReqres
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the base URL for Reqres API:
     ```sh
     VITE_APP_BASE_URL=https://reqres.in
     ```

4. Start the development server:
   ```sh
   npm run dev
   ```
