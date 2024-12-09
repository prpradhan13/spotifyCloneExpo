import { dataTagErrorSymbol, useQuery } from "@tanstack/react-query";
import {
  getAlbumData,
  getArtistsData,
  getArtistTracks,
  getPopularPlaylistsData,
  getSeveralAlbumsData,
  getSingleArtistData,
  getSinglePlaylistsData,
} from "@/src/API/SpotifyAPI";
import { useMemo } from "react";

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
