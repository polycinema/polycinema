interface RootObject {
  data: IShowtime[];
}
export interface IShowtime {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  deleted_at?: any;
  created_at?: any;
  updated_at?: any;
  room: Room;
  movie: Movie;
}
interface Movie {
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
  deleted_at?: any;
  created_at?: any;
  updated_at?: any;
}
interface Room {
  id: number;
  room_name: string;
  single_seat: number;
  double_seat: number;
  special_seat: number;
  capacity: number;
  deleted_at?: any;
  created_at?: any;
  updated_at?: any;
}