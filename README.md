# Armenia Homicide News Page

A web app for managing, displaying, and editing news related to homicides in Armenia.

## Features

- **Admin Panel:** Journalists can log in and create, edit, and manage news stories with images.
- **UUID-based database:** Utilizes Supabase with UUID fields for all IDs.
- **Story Management:** Add, edit, and delete stories, each including an image.
- **Image Gallery:** Manage section-specific images via the `section_images` table (`section_name` as identifier).
- **Role-based UI:** Admins have access to edit and create controls directly on news listings and can view all news.
- **Session Handling:** After logging in, the app reloads to update session state.
- **Dynamic Home Page:** Always displays carousel, news grid, and admin tools (for logged-in journalists).
- **File Upload:** Admins/journalists can upload new story images from their computer.

## Tech Stack

- **Frontend:** React/Next.js
- **Database:** Supabase (PostgreSQL, with strict column matching)
- **Auth:** Role-based access (journalist/admin views)
- **Deployment:** Vercel

## Setup

1. **Clone the Repository:**
    ```
    git clone https://github.com/yourusername/armenia-homicide-news-page.git
    cd armenia-homicide-news-page
    ```
2. **Install Dependencies:**
    ```
    npm install
    ```
3. **Configure Supabase:**
    - Copy `.env.example` to `.env.local` and add your Supabase credentials.
    - Use UUIDs for all IDs in your database tables.
    - Ensure database structure matches:
        - `stories`: includes `image_url` (no `preview` column).
        - `section_images`: uses `section_name` and UUID.

4. **Run the App:**
    ```
    npm run dev
    ```
5. **Deployment:**
    - Deploy with Vercel by connecting your repository.

## Usage

- **Public View:** Shows carousel and news stories.
- **Admin Panel:** Log in as a journalist to manage stories and images with embedded controls.

## Troubleshooting

- **UUID Errors:** Verify all tables use UUIDs for primary keys.
- **Image Duplication:** Editing actions should only update the intended item.
- **Column Matching:** Confirm code matches table columns (`section_name`, not `section`; no unnecessary fields).
