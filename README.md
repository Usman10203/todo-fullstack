Next.js To-Do App with Authentication

This is a modern and minimalistic To-Do App built using Next.js. It includes user authentication (sign-up and login) and allows users to manage their tasks efficiently.

✨ Features

✅ User Authentication (Sign Up & Login)✅ Secure Session Handling✅ Add, Edit, and Delete Todos✅ Responsive Design with Tailwind CSS✅ Next.js API Routes for Backend✅ Fast and Optimized Performance

🚀 Tech Stack

Next.js – React framework for performance & scalability

Tailwind CSS – Utility-first CSS framework

Prisma – ORM for database management

MongoDB / PostgreSQL – Database to store todos

NextAuth.js – Authentication handling

📂 Project Structure

📦 nextjs-todo-app
├── 📂 app             # Next.js App Router
│   ├── 📂 api        # API Routes
│   ├── 📂 auth       # Authentication Logic
│   ├── 📂 dashboard  # User Dashboard
│   ├── 📜 page.js    # Main Landing Page
├── 📂 components     # Reusable UI Components
├── 📂 styles         # Global Styles
├── 📜 .env           # Environment Variables
├── 📜 next.config.js # Next.js Configuration
└── 📜 README.md      # Documentation

🛠️ Getting Started

1️⃣ Clone the Repository

git clone https://github.com/your-username/nextjs-todo-app.git
cd nextjs-todo-app

2️⃣ Install Dependencies

npm install  # or yarn install or pnpm install

3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add your environment variables:

DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

4️⃣ Run the Development Server

npm run dev  # or yarn dev or pnpm dev

Now, open http://localhost:3000 in your browser to use the app.

📌 API Endpoints

Method

Endpoint

Description

POST

/api/auth

User authentication

GET

/api/todo

Fetch user todos

POST

/api/todo

Add a new todo

PUT

/api/todo

Edit an existing todo

DELETE

/api/todo

Delete a todo

🌍 Deployment

The easiest way to deploy this project is via Vercel:

vercel deploy

Or, check out Next.js deployment documentation for more options.

🙌 Contributing

Fork the project

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

📜 License

This project is licensed under the MIT License.

💡 Happy coding! 🚀

