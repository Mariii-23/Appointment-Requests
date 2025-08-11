# Appointment Requests

## Setup Instructions

### Environment Configuration

- **Backend:**
  1. Copy the `.env_example` file to `.env`:

     ```bash
     cp backend/.env_example backend/.env
     ```

  2. Configure the environment variables in `backend/.env` (e.g., SMTP settings, database credentials).

  3. Set up Rails encrypted credentials (to add the JWT secret):

     ```bash
     EDITOR=nvim bin/rails credentials:edit
     ```

     Then add the key `jwt_secret: "your_super_secure_key_here"` inside the credentials file.

- **Frontend:**
  1. Copy the environment example file:
     ```bash
     cp frontend/.env_example frontend/.env
     ```

## How to Run the Application

### Backend
- Database setup (`make db-up`, `make db-seed`, etc)
```bash
make db-up    # to create and migrate the database
make db-seed  # to seeds the database
```

- Start the backend server:
  ```bash
  bin/rails server
  ```

#### Seeds the database
```bash
make db-seed  
```

Seeds the database with initial data, including:
- A fixed admin nutritionist with ``email``: **admin@admin.com** and ``password``: **123456789**
- Several random nutritionists and their services (all with the default password: **123456789**)
- Fixed number of appointments per service


### Frontend

- Start the frontend server:

```bash
npm install
npm run dev
```

No special build instructions required at this time.

## Features and Decisions

### Backend Design

#### Result Format Structure
All API responses follow a consistent format:
```json
{
  "isSuccess": true|false,    // Indicates whether the operation was successful
  "result": <T>,              // The returned data (can be any type, e.g., object, array, or primitive) (empty if has errors)
  "errors": ["Error message"] // List of error messages (empty if successful)
}
```

- On the backend, errors are represented as structured ``error`` objects.

- Before being sent to the frontend, these ``errors`` are converted into a simple array of strings for easier UI rendering.

#### Service Layer Usage

- Each controller method delegates business logic to a **service class**.

- This ensures that controllers only handle HTTP-level concerns (routing, request/response parsing).

- If a controller needs logic from another entity, it calls the relevant service method instead of directly accessing the repository/model layer.

- This improves maintainability, testability, and reusability of code.

Example:

```ts
AppointmentsController -> AppointmentService -> Appointment Model
```

#### Pagination Implementation

- All GET endpoints returning lists implement a standardized pagination mechanism via the ``Pagination class``.

- The pagination returns metadata along with the data:

```ts
{
  "current_page": 1,
  "per_page": 20,
  "total_count": 120,
  "total_pages": 6,
  "data": [ ... ]
}
```

- Default values:

```ts
        page = 1
        per_page = 20
```

- The Pagination class calculates the total number of pages, total results, and applies limits/offsets to the database query.

```ts
DEFAULT_PAGE = 1
DEFAULT_PER_PAGE = 20
```

```ts
paginated_results = relation.limit(per_page).offset((page - 1) * per_page)
```

##### Pagination Parameters
- Clients can request specific pages and custom page sizes by providing the following query parameters:
  - `page` (integer, optional) — defaults to `1`
  - `per_page` (integer, optional) — defaults to `20`

Example:

```ts
GET /appointments?page=2&per_page=10
```

### Frontend Design

#### State Management & Caching
- Implemented using **Redux Toolkit** with slices dedicated to key entities (e.g., `appointments`, `services`).
- Pagination-aware caching strategy:  
  - Each fetched page is stored in the state, indexed by a combination of `page` and `per_page`.
  - When navigating between pages, the app first checks the cache before making a new API request.
  - Cache entries can be manually invalidated through specific slice reducers (e.g., `resetCache`).
- This approach minimizes API calls, improves perceived performance, and allows infinite scrolling or paginated views without re-fetching data unnecessarily.

#### Internationalization (i18n)
- Implemented with **react-i18next**.
- Translations are organized into namespaces and can be structured to mirror the component folder layout (e.g., `components/navbar`).
- Includes a language selector in the UI for dynamic switching without a page reload.

#### Styling
- Developed using **TailwindCSS** for utility-first, responsive design.
- **DaisyUI** is used to provide ready-made UI components (buttons, modals, cards) with consistent styling.
- The combination of TailwindCSS + DaisyUI reduces boilerplate and keeps UI development fast while maintaining a unified design language.

### Authentication

#### JWT Implementation
- Authentication is implemented using **JSON Web Tokens (JWT)**.
- The JWT is issued upon successful login and must be included in the `Authorization` header as a **Bearer token** for protected routes.
- Token verification is handled in backend middleware for each request that requires authentication.
- Refresh token support is not yet implemented.

#### Protected Routes
- **Service creation and management**: All routes related to creating, updating, or deleting services require authentication.
- **Appointments**: All routes that handle creating, updating, canceling, or listing appointments for a nutritionist require authentication.
- Public routes (e.g., viewing nutritionist profiles and services) do not require authentication.

## Additional Notes

### SMTP and Email Sending
- Email sending is implemented using SMTP.
- SMTP credentials must be configured in the backend `.env` file for email functionality to work.
- Example: appointments confirmations can be sent when SMTP is properly configured.

### Known Issues or Future Improvements
- **Refresh token** support for JWT authentication is not yet implemented.
- Some CRUD routes are missing, such as:
  - Delete service
  - Delete appointment
- Backend could benefit from translations of i18n
- Frontend UI could benefit from additional responsive design refinements.

### Other Relevant Info
- All passwords for seeded nutritionists are the same (`123456789`).
- Admin credentials for seeded database:
  - Email: `admin@admin.com`
  - Password: `123456789`
