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
- Start the backend server:
  ```bash
  bin/rails server
  ```

- Database setup (`make db-up`, `make db-seed`, etc)
```bash
make db-up    # to create and migrate the database
make db-seed  # to seeds the database
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
npm run dev
```

No special build instructions required at this time.

## Features and Decisions

### Backend Design
- Result format structure (`{result: T, isSuccess: boolean, errors: string[]}`)
- Service layer usage
- Pagination implementation

- testing -??? nao foram implemntados testes, no entanto ha uma colecao do postam disponivel em: ....

### Frontend Design
- State management and caching strategy (ussing pagination)
- Internationalization (i18n) approach
- Utility-First CSS: usou se TailwindCSS 

### Authentication
- JWT implementation details
- Routes requiring authentication

## Additional Notes
- SMTP and email sending setup
- Known issues or future improvements
- Any other relevant info
