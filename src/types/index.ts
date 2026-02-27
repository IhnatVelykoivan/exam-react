export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  vote_average: number
  genre_ids: number[]
  release_date: string
}

export interface MovieDetail {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  genres: Genre[]
  release_date: string
  runtime: number | null
  tagline: string
  status: string
}

export interface MoviesApiResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
