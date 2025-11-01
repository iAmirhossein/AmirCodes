# amircodes.dev Portfolio

This is the source code for my personal portfolio website, built with Vite, React, Tailwind CSS, and Supabase.

## Features

- Public portfolio with projects, skills, and blog
- Admin dashboard for managing content
- Supabase backend with Row Level Security
- GitHub OAuth for admin login

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/amircodes.dev.git
cd amircodes.dev
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the "SQL Editor" and run the SQL commands from the `supabase_setup.sql` file in this repository.
3. In the `supabase_setup.sql` file, be sure to replace `'YOUR_ADMIN_USER_ID'` with your actual user ID from the `auth.users` table after you've logged in at least once.
4. Go to "Authentication" -> "Providers" and enable GitHub OAuth. You'll need to provide the client ID and secret from a new GitHub OAuth app.
5. Go to "Settings" -> "API" and get your Project URL and anon key.

### 4. Set up environment variables

Create a `.env` file in the root of the project and add the following:

```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with the values from your Supabase project.

### 5. Run the development server

```bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

## Usage

- The public-facing portfolio is available to everyone.
- To access the admin dashboard, go to `/login` and log in with your GitHub account.
- Once logged in, you can manage all the content from the admin dashboard.
