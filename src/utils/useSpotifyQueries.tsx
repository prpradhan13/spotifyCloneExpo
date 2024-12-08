import { dataTagErrorSymbol, useQuery } from "@tanstack/react-query";
import {
  getAlbumData,
  getArtistsData,
  getPopularPlaylistsData,
  getSeveralAlbumsData,
  getSinglePlaylistsData,
} from "@/src/API/SpotifyAPI";

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

  return {
    ...query,
    data: query.data?.playListData,
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

  return {
    ...query,
    data: query.data?.playList,
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
