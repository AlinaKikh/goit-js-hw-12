import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
if (!gallery) throw new Error("Gallery element not found!");

const lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images) {
    const markup = images.map(image => `
        <a href="${image.largeImageURL}" class="gallery-item" title="${image.tags}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <span>Likes: ${image.likes}</span>
                <span>Views: ${image.views}</span>
                <span>Comments: ${image.comments}</span>
                <span>Downloads: ${image.downloads}</span>
            </div>
        </a>
    `).join('');
    
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}


