import axios from "axios";
import data from "@/src/data.json";

const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/spotify`
});

// Convert the array to a comma-separated string
const albumsIds = data.popularAlbums.join(',');
const artistsIds = data.artists.join(',');
const popularPlaylistIds = data.popularPlaylists;

export const getSeveralAlbumsData = async () => {
    try {
        const res = await api.get(
            '/albums',
            {
                params: {
                    ids: albumsIds
                }
            }
        )
        
        return res.status === 200 ? res.data : [];
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
}

export const getAlbumData = async (albumId: string) => {
    try {
        const res = await api.get(`/albums/${albumId}`)
        
        return res.status === 200 ? res.data : [];
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
}

export const getPopularPlaylistsData = async () => {    
    try {
        const res = await api.post(
            '/popular-playlists',
            { playlistIds: popularPlaylistIds }
        )

        return res.status === 200 ? res.data : [];

    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
}

export const getSinglePlaylistsData = async (playlistId: string) => {
    try {
        const res = await api.get(`/playlists/${playlistId}`)
        
        return res.status === 200 ? res.data : [];
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
}

export const getArtistsData = async () => {
    try {
        const res = await api.get(
            '/artists',
            {
                params: {
                    ids: artistsIds
                }
            }
        )
        
        return res.status === 200 ? res.data : [];
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
};

export const getSingleArtistData = async (artistId: string) => {
    try {
        const res = await api.get(`/artists/${artistId}`)

        return res.status === 200 ? res.data : {}
        
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return {};
    }
};

export const getArtistTracks = async (artistId: string) => {
    try {
        const res = await api.get(
            `/artists/${artistId}/top-tracks`
        )

        return res.status === 200 ? res.data : [];
    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return [];
    }
}

export const getTrackDetails = async (trackId: string) => {
    if (!trackId) return null;
    try {
        const res = await api.get(
            `/tracks/${trackId}`
        )

        return res.status === 200 ? res.data : {};

    } catch (error: any) {
        console.log(error.response?.data || error.message);
        return {};
    }
}
