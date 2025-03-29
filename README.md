# Employ.Reqres

Employ.Reqres is a web application built with Vite, React.js, and Tailwind CSS. It utilizes Redux for state management and React Hot Toast for displaying success and error messages. The app interacts with the Reqres API to perform CRUD operations on users.

(image.png)

## Features

- **User Listing**: Fetches and displays users from the Reqres API.
- **Edit User**: Users can update their details.
- **Delete User**: Removes a user upon confirmation.
- **State Management**: Redux Toolkit manages application state.
- **Notifications**: React Hot Toast provides instant feedback for actions.
- **Responsive UI**: Styled with Tailwind CSS for a modern and mobile-friendly design.

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
