<div align="left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/moorcheh-ai/moorcheh-boilerplate/implement_logo/template/public/moorcheh-logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/moorcheh-ai/moorcheh-boilerplate/implement_logo/template/public/moorcheh-logo-light.svg">
    <img width="250px" alt="Moorcheh Logo" src="https://raw.githubusercontent.com/moorcheh-ai/moorcheh-boilerplate/implement_logo/template/public/moorcheh-logo-light.svg">
  </picture>
  <br />
  <h1>Moorcheh Chat Boilerplate</h1>
  <p>A Next.js boilerplate for building chat applications with Moorcheh AI integration.</p>
</div>

[![npm version](https://img.shields.io/npm/v/moorcheh-chat-boilerplate?style=flat-square)](https://www.npmjs.com/package/moorcheh-chat-boilerplate)
[![npm downloads](https://img.shields.io/npm/dt/moorcheh-chat-boilerplate?style=flat-square)](https://www.npmjs.com/package/moorcheh-chat-boilerplate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
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

After creating your project, you'll need to configure the Moorcheh AI integration:

### 1. Get Your Moorcheh API Key

1. Visit [Moorcheh Console](https://console.moorcheh.ai/)
2. Sign up or log in to your account
3. Create a new Namespace and upload documents or select an existing one
4. Copy your API key from the [Moorcheh API](https://console.moorcheh.ai/api-keys)

### 2. Configure API Settings

1. **Set your API key** in `.env.local`:
```bash
NEXT_PUBLIC_MOORCHEH_API_KEY = 'your_api_key_here'
```

2. **Configure your API request** in `config/api-config.json`:
   - Visit [Moorcheh Console Playground](https://console.moorcheh.ai/playground)
   - Configure your namespace, model, and other settings
   - Export the complete JSON configuration
   - Paste it into `config/api-config.json`

The boilerplate will automatically handle the `query` and `chatHistory` fields while using your namespace and model configuration.

### 3. Additional Customization (Optional)

- **Branding**: Edit `.env.local` with your app name and logo
- **Themes**: Customize in `customize/themes/` directory  
- **Fonts**: Customize in `customize/fonts/` directory

See the documentation files in your generated project for detailed customization guides.

## Project Structure

```
your-project/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── chat/             # Chat-specific components
│   └── ui/               # Reusable UI components
├── config/               # API configuration
├── customize/            # Theme and font customization
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
