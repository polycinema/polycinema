export interface RootBooking {
  id: number;
  booking_id: string;
  user_id: number;
  showtime_id: number;
  total_price: number;
  coupon_code?: any;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  showtime: Showtime;
  products: any[];
  seats: Seat[];
}
interface Seat {
  id: number;
  seat_name: string;
  type: string;
  showtime_id: number;
  status: string;
  price: number;
  user_id: number;
  booking_id: number;
  deleted_at?: any;
  created_at: string;
  updated_at: string;
  showtime: Showtime2;
}
interface Showtime2 {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  room: Room;
}
interface Room {
  id: number;
  room_name: string;
  capacity: number;
  deleted_at?: any;
  created_at?: any;
  updated_at?: any;
}
interface Showtime {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}
interface User {
  id: number;
  name: string;
  full_name?: any;
  image?: any;
  email: string;
  email_verified_at?: any;
  role: string;
  phone?: any;
  date_of_birth?: any;
  gender?: any;
  deleted_at?: any;
  created_at: string;
  updated_at: string;
}