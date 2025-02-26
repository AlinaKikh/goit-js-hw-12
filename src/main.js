import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { PER_PAGE } from './js/pixabay-api.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

async function handleSearch(event) {
    event.preventDefault();
    query = event.target.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search query' });
        return;
    }

    page = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';

    try {
        const response = await fetchImages(query, page);
        totalHits = response.totalHits;

        if (response.hits.length === 0) {
            iziToast.error({ title: 'Error', message: 'No images found, try another query' });
        } else {
            renderImages(response.hits);
            if (totalHits > PER_PAGE) loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong' });
    } finally {
        loader.style.display = 'none';
    }
}

async function handleLoadMore() {
    if (!query) return;
    page += 1;
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';

    try {
        const response = await fetchImages(query, page);
        renderImages(response.hits);

        if (page * PER_PAGE >= totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
        } else {
            loadMoreBtn.style.display = 'block';
        }

        const { height } = gallery.firstElementChild?.getBoundingClientRect() || { height: 0 };
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong' });
    } finally {
        loader.style.display = 'none';
    }
}

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);


if (totalHits > PER_PAGE) {
    loadMoreBtn.style.display = 'block';
}
