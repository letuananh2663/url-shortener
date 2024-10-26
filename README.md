# Linkly

[![Header](https://github.com/letuananh2663/url-shortener/blob/main/public/lnkly.png)](https://github.com/letuananh2663)

## Key Features

- **User Authentication:** Secure login and registration via Clerk.
- **URL Shortening:** Users can shorten long URLs easily, with options for custom short codes and expiration dates.
- **Password Protection:** Option to secure shortened URLs with passwords.
- **Usage Limits:** Unauthenticated users can create a maximum of 5 URLs based on their IP address.
- **Visit Tracking:** Each shortened URL tracks the number of visits.

## Technologies Used

</a> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>

- **Next.js:** A powerful React framework that supports server-side rendering and static site generation for optimal performance and user experience.
- **React.js:** A JavaScript library for building user interfaces, enabling a component-based architecture.
- **Tailwind CSS:** A utility-first CSS framework that provides rapid styling options, enhancing the design process.
- **shadcn/ui:** A modern UI component library built on top of Tailwind CSS, designed for creating beautiful user interfaces quickly.
- **Supabase:** An open-source Firebase alternative that provides a backend-as-a-service with real-time database and authentication capabilities.

## Setup Instructions

- Clone the Repository

```bash
git clone https://github.com/letuananh2663/url-shortener.git
cd url-shortener
```

- Install Dependencies

Ensure you have Node.js and npm installed. Then execute:

```bash
npm install
```

- Configure Environment Variables

Create a ```.env``` file in the root directory and add the following variables

```
DATABASE_URL=your_database_url_here
NEXT_PUBLIC_BASE_URL=your_base_url_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

## Run Database Migrations

```bash
npx prisma db push
npx prisma generate
```

## Start the Development Server

Launch the application locally with:

```bash
npm run dev
```

## Future Enhancements

- **Role-Based Access Control:** Implement user roles to facilitate different access levels and administrative features.
- **Enhanced Analytics:** Introduce analytics tools for tracking user engagement and URL performance.
- **User Interface Improvements:** Revamp the UI for a more intuitive user experience.
- **CRUD Functionality:** Allow users to edit or delete their shortened URLs.
- **Custom Alias Support:** Expand the custom alias feature beyond the 8-character limit for greater flexibility.
