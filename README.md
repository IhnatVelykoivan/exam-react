# Frontend React.js Control Work (Movies App)

A React application for browsing movies using the [TMDB API](https://www.themoviedb.org/).

## Tech Stack

- **React 18** — functional components, hooks
- **TypeScript** — strict typing
- **Redux Toolkit** — global state management
- **React Router v6** — client-side routing
- **CSS Modules** — scoped styling
- **Vite** — build tool

## Features

- Browse movies from TMDB (`/discover/movie`)
- Filter movies by genre (sidebar)
- Search movies by title with debounce
- Pagination
- Movie detail page — poster, tagline, rating, genres, overview
- Star rating component (`vote_average / 2` → out of 5 stars)
- Poster placeholder for movies without images
- UserInfo component (hardcoded avatar + name)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd movies-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```
VITE_TMDB_TOKEN=your_bearer_token_here
```

> Get your Bearer token from [TMDB API Settings](https://www.themoviedb.org/settings/api).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── tmdb.ts              # TMDB API calls
├── components/
│   ├── Header/              # Search bar
│   ├── MoviesList/          # Grid of movie cards
│   ├── MoviesListCard/      # Single movie card
│   ├── PosterPreview/       # Movie poster image
│   ├── StarsRating/         # Star rating (out of 5)
│   ├── MovieInfo/           # Title, description, badges
│   ├── GenreBadge/          # Genre tag
│   └── UserInfo/            # User avatar and name
├── pages/
│   ├── MoviesPage/          # Home page — list + genre sidebar
│   └── MovieDetailPage/     # Movie detail page
├── store/
│   ├── index.ts
│   ├── moviesSlice.ts       # Movies, pagination, search, genre filter
│   └── genresSlice.ts       # Genres list
├── types/
│   └── index.ts             # TypeScript interfaces
├── App.tsx
└── main.tsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_TOKEN` | TMDB Bearer token for API authorization |

> Never commit `.env` to a public repository — it is listed in `.gitignore`.
