# Frontend React.js Control Work (Movies App)

A React application for browsing movies using the [TMDB API](https://www.themoviedb.org/).

## Tech Stack

- **React 19** — functional components, hooks
- **TypeScript** — strict typing
- **Redux Toolkit** — global state management (`createSlice`, `createAsyncThunk`)
- **React Router v7** — client-side routing
- **CSS Modules** — scoped styling
- **Vite** — build tool

## Features

- Browse movies from TMDB (`/discover/movie`)
- Filter movies by genre (sidebar)
- Search movies by title with debounce
- Pagination (up to 500 pages, TMDB limit)
- Movie detail page — poster, backdrop, tagline, rating, genres, overview
- Star rating component (`vote_average / 2` → out of 5 stars)
- Poster placeholder for movies without images
- UserInfo component (avatar + name)

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

Copy the example file and fill in your token:

```bash
cp .env.example .env
```

Edit `.env`:

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
│   └── tmdb.ts              # TMDB API calls (fetch + error handling)
├── components/
│   ├── Header/              # Search bar with debounce
│   ├── MoviesList/          # Grid of movie cards
│   ├── MoviesListCard/      # Single movie card (link to detail)
│   ├── PosterPreview/       # Movie poster with fallback placeholder
│   ├── StarsRating/         # Star rating (out of 5)
│   ├── MovieInfo/           # Title, year, genres, overview
│   ├── GenreBadge/          # Genre tag
│   └── UserInfo/            # User avatar and name
├── pages/
│   ├── MoviesPage/          # Home page — list + genre sidebar + pagination
│   └── MovieDetailPage/     # Movie detail page
├── store/
│   ├── index.ts             # Store configuration + RootState / AppDispatch types
│   ├── hooks.ts             # Typed useAppDispatch and useAppSelector hooks
│   ├── moviesSlice.ts       # Movies, pagination, search, genre filter
│   └── genresSlice.ts       # Genres list
├── types/
│   └── index.ts             # TypeScript interfaces (Movie, Genre, etc.)
├── App.tsx
└── main.tsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_TOKEN` | TMDB Bearer token for API authorization |

> Never commit `.env` to a public repository — it is listed in `.gitignore`.
