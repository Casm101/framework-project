export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    genre_ids: number[];
    backdrop_path: string;
    poster_path: string;
    original_language: string;
    popularity: number;
    release_date: string;
    video: boolean;
    adult: boolean;
    vote_average: number;
    vote_count: number;
}