import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = event.target.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query' });
        return;
    }

    page = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    loader.classList.add('show');
    
    try {
        const data = await fetchImages(query, page);
        totalHits = data.totalHits;
        
        if (data.hits.length === 0) {
            iziToast.error({ title: 'Error', message: 'No images found, try another query' });
        } else {
            renderImages(data.hits);
            if (totalHits > 40) loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong' });
    } finally {
        loader.classList.remove('show');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loadMoreBtn.style.display = 'none';
    loader.classList.add('show');
    
    try {
        const data = await fetchImages(query, page);
        renderImages(data.hits);

        if (page * 40 >= totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        } else {
            loadMoreBtn.style.display = 'block';
        }

        const { height } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong' });
    } finally {
        loader.classList.remove('show');
    }
});

if (data.hits.length < 40) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
} else {
    loadMoreBtn.style.display = 'block';
}

if (gallery.firstElementChild) {
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
}