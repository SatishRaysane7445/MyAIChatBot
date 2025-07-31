# Corporation Chatbot

A modern chatbot web application using Node.js, Express, and Gemini AI API.

## Features

- Clean, modern UI with company branding and logo
- Secure backend with environment variable protection
- Responsive chat bubbles for user and AI
- Easy to customize for your organization

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the server**
   ```sh
   node server.js
   ```
5. **Open your browser** at [http://localhost:3000](http://localhost:3000)

## Security

- The `.env` file is included in `.gitignore` and will not be committed to version control.
- Never expose your API key in frontend code.

## Customization

- Update your logo in `public/images/image1.png` and company name in `public/chatbot.html` as needed.

---

© 2025 Corporation. All rights reserved.
