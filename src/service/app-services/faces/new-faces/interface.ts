export interface NewFace {
  id: string;
  name: string;
  camera_id: string;
  image_data: string;
  score: number;
  last_seen: string;
  last_seen_seconds: number;
}

export interface NewFacesResponse {
  new_faces: NewFace[];
}
