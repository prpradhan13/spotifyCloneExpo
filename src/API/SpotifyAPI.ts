import axios from "axios";
import data from "@/src/data.json";

const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1/spotify`
});

// Convert the array to a comma-separated string
const albumsIds = data.popularAlbums.join(',');

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