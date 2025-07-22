Product Requirements Document (PRD) for moorcheh-chat Boilerplate
1. Project Overview
1.1 Purpose
The moorcheh-chat boilerplate is a free, open-source Next.js starter kit designed to accelerate the development of AI-driven chat applications powered by the moorcheh.ai API. It provides a pre-configured, production-ready template with a modern tech stack, customizable UI components via shadcn/ui, and a CLI (npx moorcheh-chat) for easy project initialization. The boilerplate integrates the moorcheh.ai API’s /answer endpoint to enable chat generation, offering developers a seamless starting point for building conversational interfaces.
1.2 Target Audience

Developers building AI-powered chat applications using the moorcheh.ai API.
Startups or solo developers creating moorcheh.ai-branded SaaS products.
Teams seeking a TypeScript-based, accessible, and responsive web application template.

1.3 Goals

Enable developers to scaffold a project in minutes using npx moorcheh-chat <project-name>.
Provide a lightweight, modular template with shadcn/ui for customizable UI components.
Integrate the moorcheh.ai API’s /answer endpoint for AI-driven chat responses.
Ensure type safety, code quality, and modern best practices (e.g., Next.js App Router, Tailwind CSS).
Support rapid prototyping and deployment to platforms like Vercel.

2. User Flows
2.1 Developer Setup Flow

Initialize Project:
Run npx moorcheh-chat <project-name> in the terminal.
CLI creates a Next.js project with pre-installed dependencies, shadcn/ui, and a chat component configured for the moorcheh.ai API.


Configure Environment:
Add MOORCHEH_API_KEY to .env.local for authenticating with the moorcheh.ai API.


Run Development Server:
Execute npm run dev to start the app at http://localhost:3000.
View a homepage with a chat interface powered by the /answer endpoint.


Customize:
Add more shadcn/ui components using npx shadcn-ui@latest add.
Modify the chat UI or integrate additional moorcheh.ai API features.


Deploy:
Deploy to Vercel or another platform with minimal configuration.



2.2 End-User Flow (Example Chat App)

Access App:
Visit the deployed app (e.g., https://my-app.vercel.app).
See a welcome page with a chat interface branded for moorcheh.ai.


Interact with Chat:
Type a message in the input field.
Press "Send" or Enter to submit.
Receive an AI-generated response from the moorcheh.ai /answer endpoint.


Customize Experience:
(Optional) Log in via authentication (e.g., Clerk) to save chat history.
Use responsive UI across devices (desktop, tablet, mobile).



3. Tech Stack

Framework: Next.js 15 (App Router) for server-side rendering, static site generation, and modern React features.
Language: TypeScript for type safety and improved developer experience.
Styling: Tailwind CSS for utility-first styling, integrated with shadcn/ui.
UI Components: shadcn/ui for accessible, customizable React components (e.g., Button, Input, Card, Dialog, Avatar).
Chat UI: Custom chat component built with shadcn/ui, integrated with the moorcheh.ai API’s /answer endpoint.
API Integration: moorcheh.ai API for chat generation via the /answer endpoint, authenticated with an API key.
Optional Dependencies:
@clerk/nextjs: For authentication (optional, can be added later).
@biomejs/biome: For linting and formatting.


CLI: Custom Node.js CLI (moorcheh-chat) using commander and fs-extra for project scaffolding.
Deployment: Vercel-ready configuration for seamless deployment.

4. Core Features
4.1 Boilerplate Template

Next.js Setup:
Pre-configured with TypeScript, Tailwind CSS, ESLint, and App Router.
src/ directory structure with @/* import alias.
Optimized for performance (SSR, static generation).


Homepage:
Simple welcome page with moorcheh.ai branding (h1, description).
Embeds a chat component connected to the moorcheh.ai API.


Chat Component:
Built with shadcn/ui components (Card, Input, Button, Avatar).
Displays user messages and AI responses in a scrollable window.
Sends user input to the moorcheh.ai /answer endpoint and displays responses.
Supports keyboard input (Enter to send).


Code Quality:
ESLint for linting (default from create-next-app).
Optional Biome integration for advanced linting/formatting.
Prettier for consistent code formatting.



4.2 CLI (npx moorcheh-chat)

Scaffolding:
Runs create-next-app with predefined options (TypeScript, Tailwind, App Router).
Initializes shadcn/ui with New York style, Slate base color, and CSS variables.
Installs core shadcn/ui components (Button, Input, Card, Dialog, Avatar).
Copies custom template files (e.g., Chat.tsx, page.tsx) with moorcheh.ai API integration.


Error Handling:
Checks for existing directories and prompts for overwrite.
Provides clear terminal feedback on success or failure.


Extensibility:
Allows users to add more shadcn/ui components post-setup.



4.3 moorcheh.ai API Integration

Endpoint: /answer for generating AI-driven chat responses.
Authentication: Uses MOORCHEH_API_KEY in the Authorization header (e.g., Bearer <key>).
Request Format: POST request with JSON payload containing user messages.
Response Handling: Displays AI-generated responses in the chat UI.
Environment Variable: Securely stores MOORCHEH_API_KEY in .env.local.

4.4 Optional Features

Authentication:
Support for Clerk or NextAuth.js for user management (optional, can be added via CLI prompt).


Documentation:
README.md with setup, API configuration, and customization instructions.



5. UI Details
5.1 Design Principles

Accessibility: Use shadcn/ui components built with Radix UI for ARIA compliance.
Responsiveness: Tailwind CSS ensures the UI adapts to desktop, tablet, and mobile devices.
Customizability: shadcn/ui components are copy-pasteable and editable, with Tailwind classes for styling.
Minimalist Aesthetic: Slate base color with New York style for a clean, modern look aligned with moorcheh.ai branding.

5.2 Key Components

Homepage:
Centered layout with moorcheh.ai logo or text (h1, description).
Chat component embedded below the welcome text.
Tailwind classes for responsive padding and typography.


Chat UI:
Card: Contains the chat window and input form.
Input: Text input for user messages, with Enter key support.
Button: Send button with hover effects.
Avatar: Displays user/AI initials for each message.
Scrollable message area with max-h-96 and overflow-y-auto.


Global Styles:
globals.css with Tailwind base, components, and utilities.
Light background (bg-gray-50) and dark text (text-gray-900).



5.3 Example Chat UI Layout
----------------------------------------
|              Welcome to moorcheh.ai           |
|  A Next.js boilerplate for AI-driven chat apps |
----------------------------------------
| [Card]                               |
| | [Avatar] You: Hello!             | |
| | [Avatar] AI: Hi! How can I help? | |
| |                                  | |
| | [Input] Type a message... [Button: Send] |
----------------------------------------

6. In-Scope vs. Out-of-Scope
6.1 In-Scope

Next.js 15 project with TypeScript, Tailwind CSS, and App Router.
shadcn/ui integration with core components (Button, Input, Card, Dialog, Avatar).
Custom chat component integrated with moorcheh.ai API’s /answer endpoint.
CLI (npx moorcheh-chat) to scaffold the project.
README.md with setup, API configuration, and customization instructions.
Vercel-compatible deployment configuration.

6.2 Out-of-Scope (for initial release)

Real-time chat (e.g., WebSockets, Supabase).
Advanced authentication (e.g., multi-tenancy, roles/permissions).
Database integration (e.g., Prisma, Drizzle ORM).
Additional pages (e.g., landing page, dashboard) beyond the homepage.
Other moorcheh.ai API endpoints beyond /answer.
Testing suite (e.g., Vitest, Playwright).

7. Non-Functional Requirements

Performance: Lightweight template with minimal dependencies for fast builds and runtime.
Scalability: Modular structure to support adding features (e.g., auth, database).
Maintainability: TypeScript and shadcn/ui ensure type-safe, editable components.
Accessibility: shadcn/ui components are ARIA-compliant.
Compatibility: Supports Node.js LTS (v18 or later) and modern browsers.
Security: Securely store MOORCHEH_API_KEY in .env.local, excluded from Git via .gitignore.

8. Security Guidelines

API Key: Store MOORCHEH_API_KEY in .env.local and never expose it in client-side code.
Input Validation: Sanitize user input in the chat component to prevent XSS attacks.
Dependencies: Use audited packages (create-next-app, shadcn/ui) and keep them updated.
Optional Auth: If Clerk is added, follow its security best practices (e.g., secure session management).

9. Success Metrics

Developer Adoption: 100+ GitHub stars or npm downloads within 3 months of release.
Ease of Setup: CLI scaffolds a project in <5 minutes with no errors.
Usability: Developers can add a new shadcn/ui component in <1 minute using npx shadcn-ui@latest add.
Performance: App loads in <2 seconds on npm run dev with default setup.
API Integration: Chat UI successfully sends requests to /answer endpoint and displays responses.

10. Development Plan
10.1 Phase 1: Build Template (2-3 days)

Initialize Next.js project with TypeScript, Tailwind, and App Router.
Integrate shadcn/ui with core components.
Build custom Chat component integrated with moorcheh.ai /answer endpoint.
Test locally (npm run dev) and document in README.md.

10.2 Phase 2: Build CLI (1-2 days)

Create moorcheh-chat-cli package with commander and fs-extra.
Copy template files to template/ directory.
Automate create-next-app and shadcn-ui init/add.
Test CLI with npm link and npx moorcheh-chat my-app.

10.3 Phase 3: Publish and Promote (1 day)

Publish CLI to npm (npm publish).
Push template and CLI to GitHub (moorcheh-ai/moorcheh-chat).
Share on X, r/nextjs, and DEV Community.

11. Risks and Mitigations

Risk: Limited documentation for moorcheh.ai API’s /answer endpoint.
Mitigation: Assume OpenAI-compatible format (e.g., /v1/chat/completions); refine once documentation is available.


Risk: CLI fails on certain OS or package managers.
Mitigation: Test on Windows, macOS, Linux with npm/Yarn; add error handling.


Risk: Template becomes bloated with dependencies.
Mitigation: Keep initial dependencies minimal; allow users to add features post-setup.



12. Future Enhancements

Support additional moorcheh.ai API endpoints (if available).
Add real-time chat with Supabase or WebSockets.
Integrate authentication (Clerk, NextAuth) via CLI prompt.
Include a landing page or dashboard template.
Add testing suite (Vitest, Playwright).
