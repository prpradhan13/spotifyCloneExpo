import { useQuery } from "@tanstack/react-query";
import {
  getAlbumData,
  getPopularPlaylistsData,
  getSeveralAlbumsData,
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
    albumData: query.data?.playListData,
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
