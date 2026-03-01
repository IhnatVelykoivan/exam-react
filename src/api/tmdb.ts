const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`

const headers = {
  Authorization: TOKEN,
  'Content-Type': 'application/json',
}

const toJson = (res: Response) => {
  if (!res.ok) throw new Error(`HTTP error ${res.status}`)
  return res.json()
}

export const fetchMovies = (page: number, genreId?: number) =>
  fetch(
    `${BASE_URL}/discover/movie?page=${page}${genreId ? `&with_genres=${genreId}` : ''}`,
    { headers }
  ).then(toJson)

export const fetchGenres = () =>
  fetch(`${BASE_URL}/genre/movie/list`, { headers }).then(toJson)

export const searchMovies = (query: string, page: number) =>
  fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    { headers }
  ).then(toJson)

export const fetchMovieById = (id: number) =>
  fetch(`${BASE_URL}/movie/${id}`, { headers }).then(toJson)

export const getPosterUrl = (path: string | null): string =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : '/placeholder.png'
