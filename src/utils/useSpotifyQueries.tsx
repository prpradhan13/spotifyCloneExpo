import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAlbumData,
  getArtistsData,
  getArtistTracks,
  getPopularPlaylistsData,
  getSearchResults,
  getSeveralAlbumsData,
  getSingleArtistData,
  getSinglePlaylistsData,
  getTrackDetails,
} from "@/src/API/SpotifyAPI";
import { useMemo } from "react";
import { Track } from "../types/TrackTypes";

export const usePopularAlbums = () => {
  const query = useQuery({
    queryKey: ["popularAlbums"],
    queryFn: getSeveralAlbumsData,
  });

  return {
    ...query,
    data: query.data?.albums || [],
  };
};

export const useSingleAlbum = (albumId: string) => {
  const query = useQuery({
    queryKey: [`album_${albumId}`],
    queryFn: () => getAlbumData(albumId),
  });

  const data = useMemo(() => query.data?.playListData, [query.data])

  return {
    ...query,
    data,
  };
};

export const usePopularPlaylists = () => {
  const query = useQuery({
    queryKey: ["popularPlaylists"],
    queryFn: getPopularPlaylistsData,
  });

  return {
    ...query,
    data: query.data?.popularPlaylists || [],
  };
};

export const useSinglePlaylist = (playlistId: string) => {
  const query = useQuery({
    queryKey: [`playlist_${playlistId}`],
    queryFn: () => getSinglePlaylistsData(playlistId),
  });

  const data = useMemo(() => query.data?.playList, [query.data])

  return {
    ...query,
    data,
  };
};

export const useSeveralArtist = () => {
  const query = useQuery({
    queryKey: ["severalArtists"],
    queryFn: getArtistsData,
  });

  return {
    ...query,
    data: query.data?.artists || []
  }
}

export const useSingleArtist = (artistId: string) => {
  const query = useQuery({
    queryKey: [`artist_${artistId}`],
    queryFn: () => getSingleArtistData(artistId),
  });

  const artistDetails = useMemo(() => query.data?.artist, [query.data])

  return {
    ...query,
    artistDetails
  }
}

export const useSingleArtistTracks = (artistId: string) => {
  const query = useQuery({
    queryKey: [`artistTracks_${artistId}`],
    queryFn: () => getArtistTracks(artistId),
  });

  const data = useMemo(() => query.data?.artistTopTracks, [query.data]);

  return {
    ...query,
    data
  }
}

export const useTrackDetails = (trackId: string | null) => {
  const query =  useQuery({
    queryKey: [`track_${trackId}`],
    queryFn: () => getTrackDetails(trackId as string),
    enabled: !!trackId
  });

  return{
    ...query,
    trackData: query.data?.trackDetails
  }
}
export const useSearchResults = (searchTerm: string) => {
  return useQuery<Track[]>({
    queryKey: [`track_${searchTerm}`],
    queryFn: () => getSearchResults(searchTerm),
    enabled: !!searchTerm
  });
}
