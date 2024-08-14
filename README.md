# Authentication Template Project

## Overview

This project is an Authentication Template built using Laravel Jetstream, Inertia, React, and NextUI. It provides a modern and user-friendly authentication system with features such as registration, login, and password management.

## Technologies Used

-   **Backend:** Laravel Jetstream
-   **Frontend:** React, NextUI
-   **State Management:** React's Context API
-   **Form Handling:** Inertia.js
-   **UI Components:** NextUI

## Project Structure

### `app/Http/Controllers`

-   **OfficeController**: Handles operations related to offices.

### `resources/js/Components`

-   **`AppNavbar`**: The main navigation bar of the application.
-   **`SideNavbar`**: The sidebar navigation component.
-   **`NavItems`**: Component for rendering navigation items.

### `resources/js/Forms`

-   **`LoginForm`**: Component for user login.
-   **`RegisterForm`**: Component for user registration.

### `resources/js/Utils`

-   **`constants.jsx`**: Contains global constants used throughout the project.
-   **`icons.jsx`**: Defines and exports React components for SVG icons used in the application.

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies:**

    ```bash
    npm install
    ```

4. **Set up the environment file:**

    Copy the `.env.example` file to `.env` and configure the environment variables as needed.

    ```bash
    cp .env.example .env
    ```

5. **Generate the application key:**

    ```bash
    php artisan key:generate
    ```

6. **Run the database migrations:**

    ```bash
    php artisan migrate
    ```

7. **Start the development server:**

    ```bash
    npm run dev
    ```

## Usage

1. **Access the application:**

    Open your browser and navigate to `http://localhost:3000` to access the application.

2. **Authentication:**

    The application includes user registration and login functionalities. Use the provided forms to create new accounts or log in.

## Project Components

### `AppNavbar`

-   **Description:** The main navigation bar of the application, containing links to different sections.

### `SideNavbar`

-   **Description:** The sidebar navigation component with links for various sections.

### `NavItems`

-   **Description:** Component for rendering navigation items based on the current URL and `sidebarView`.

### `LoginForm`

-   **Description:** Component for user login with fields for username and password.

### `RegisterForm`

-   **Description:** Component for user registration with fields for user details, contact information, and passwords.

## Contributing

If you wish to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
