# Moorcheh Chat Boilerplate

A Next.js boilerplate for building chat applications with Moorcheh AI integration.

## Installation

```bash
npm install -g moorcheh-chat-boilerplate
```

## Usage

Create a new project:

```bash
npx moorcheh-chat-boilerplate
```

Or if installed globally:

```bash
moorcheh-chat-boilerplate
```

Follow the prompts to:
1. Enter your project name
2. The boilerplate will be copied to a new directory
3. Navigate to your project and install dependencies

```bash
cd your-project-name
npm install
npm run dev
```

## What's Included

- **Next.js 15** with React 19
- **Tailwind CSS** for styling
- **Radix UI** components
- **Framer Motion** for animations
- **Chat components** pre-built and ready to use
- **Moorcheh AI integration** setup
- **TypeScript** configuration
- **ESLint** configuration

## Features

- **AI Chat Interface** - Pre-built chat components
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **TypeScript** - Full type safety
- **Mobile Responsive** - Works on all devices
- **Dark Mode** - Built-in theme switching
- **Fast Development** - Hot reload and Turbopack support

## Configuration

After creating your project, you'll need to:

1. Set up your Moorcheh API key in `.env.local`:
```bash
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here
```

2. Customize the chat components in `components/chat/`
3. Modify the API integration in `client/answer.ts`

## Project Structure

```
your-project/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── chat/             # Chat-specific components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC 