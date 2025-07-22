# Moorcheh Chat Boilerplate

Welcome to your new Moorcheh Chat Boilerplate project! This is a [Next.js](https://nextjs.org) project designed to get you building AI-powered chat applications quickly.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## What's Included

- **Next.js 15** with React 19
- **Tailwind CSS** for styling
- **Radix UI** components
- **Chat components** pre-built and ready to use
- **Moorcheh AI integration** setup
- **TypeScript** configuration
- **ESLint** configuration

## Configuration

Before you begin, you'll need to:

1.  **Set up your API configuration**: Copy the contents of `config/api-config.example.json` to a new file named `config/api-config.json`. Then, paste your complete API request body into this new file. The boilerplate will automatically handle the `query` and `chatHistory` fields.

2.  **Customize your chat**: Explore the `customize` directory to change themes and fonts. See the `README.md` files in those directories for more details.

## Project Structure

```
your-project/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── chat/             # Chat-specific components
│   └── ui/               # Reusable UI components
├── config/                 # API configuration
├── customize/              # Theme and font customization
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and core logic
└── public/                 # Static assets
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.