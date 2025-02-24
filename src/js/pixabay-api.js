import axios from 'axios';

const API_KEY = '48944298-6db138da2f96cff679e6bbba9';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export function fetchImages(query, page) {
    return axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: PER_PAGE,
            page
        }
    }).then(response => response.data)
    .catch(error => { 
        console.error('Error fetching images:', error.message); 
        throw new Error(error.message);
    });
}

