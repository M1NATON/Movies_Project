

export interface ReviewType {
  id?: string;
  user_id?: string;
  movie_id: number
  description?: string;
  rating: number;
  created_at?: string;
  updated_at?: string;
}