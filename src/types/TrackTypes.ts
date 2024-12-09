export type ArtistType = {
  id: string;
  name: string;
  href: string;
  external_urls: { spotify: string };
  type: string;
  uri: string;
};

export interface TrackDetails {
  id: string;
  trackName: string;
  artists: ArtistType[];
  imageUrl: string;
}

export type TrackType = {
  id: string;
  trackName: string;
  artists: ArtistType[];
  imageUrl: string;
};

export type PlayerContextType = {
  setTrackId: (trackId: string | null) => void;
  track: TrackType | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export type SinglePlaylistProps
