import axios from 'axios';

const API_KEY = '48944298-6db138da2f96cff679e6bbba9';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function fetchImages(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: PER_PAGE,
                page
            }
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching images');
    }
}