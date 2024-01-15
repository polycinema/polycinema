export interface RootMovie {
  data: IMovie[]
}
export interface IMovie {
  id: number;
  name: string;
  title: string;
  image: string;
  trailer: string;
  description: string;
  release_date: string;
  duration: number;
  director_id: number;
  status: string;
  level: string;
  deleted_at: any;
  created_at: any;
  updated_at: string;
  director: Director;
  genres: Genre[];
  actors: Actor[];
}

export interface Director {
  id: number;
  name: string;
  image: string;
  level: string;
  created_at: any;
  updated_at: any;
}

export interface Genre {
  id: number;
  name: string;
  level: string;
  deleted_at: any;
  created_at: any;
  updated_at: any;
  pivot: Pivot;
}

export interface Pivot {
  movie_id: number;
  genre_id: number;
}

export interface Actor {
  id: number;
  name: string;
  date_of_birth: string;
  image: string;
  level: string;
  created_at: any;
  updated_at: any;
  pivot: Pivot2;
}
export interface Pivot2 {
  movie_id: number;
  actor_id: number;
}