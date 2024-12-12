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

export type Track = {
  id: string;
  trackName: string;
  artists: ArtistType[];
  imageUrl: string;
}

export type Player = [{
  id?: string,
  musicSample?: string | undefined,
  videoSample?: string | undefined,
}]

export type TrackType = {
  normalizedTrack: Track,
  playbackData?: Player | undefined
};

export type PlayerContextType = {
  setTrackId: (trackId: string | null) => void;
  track: TrackType | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isPlaying: boolean; 
  playAudio: () => Promise<void>;
  pauseAudio: () => Promise<void>;
  seekAudio: (value: number) => Promise<void>;
  position: number;
  duration: number;
  soundLoading: boolean;
};

export type SearchResults = {
  searchData: Track[];
}