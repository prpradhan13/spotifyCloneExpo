export interface Artist {
  id: string;
  name: string;
}

export interface TrackDetails {
  id: string;
  trackName: string;
  artists: Artist[];
  imageUrl: string;
}
