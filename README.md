This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Go to https://www.visualcrossing.com and create an account.
2. Once logged in go to https://www.visualcrossing.com/account/ and copy your API key.
3. Duplicate the `.env.example` file and rename it to `.env`.
4. Open the `.env` file and add your API key to the `WEATHER_API_KEY` variable.
5. Install dependencies by running `npm i` in the terminal.
6. Then run `npm run dev` to start the development server.
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Decisions

- I used a Next.js API route to create a server-side endpoint, preventing the client-side exposure to the secret key. `src/app/api/weather/route.ts`
- For better organization and management, I used Zustand to keep all weather-related app state in a central store. `src/stores/weather/index.ts`
- Using Sass and CSS Modules for styling allowed me to make use of Sass's class nesting for better organization, though it made styling a bit slower than if I had used Tailwind CSS and its utility-first approach. `src/components/weather/styles.module.scss`
- I chose localStorage for browser caching because, unlike sessionStorage which is cleared when the browser session ends, localStorage provides persistent storage that better aligns with the needs of this app. I've set the cache duration to 30 minutes. `src/utils/weather-cache.ts`
