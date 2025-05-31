export interface UserCardProps {
  id?: string;
  user_name: string;
  camera_name?: string;
  image_data: string;
  score: number;
  last_seen: string;
  last_seen_seconds?: number;
  onDelete?: () => void;
  onEdit?: () => void;
}
