const openModal = document.getElementById("open-modal") as HTMLElement | null;
const modal = document.getElementById("modal") as HTMLElement | null;
const closeBtn = document.getElementById("close") as HTMLElement | null;
const toggleBtn = document.getElementById("mode-toggle") as HTMLElement | null;
const body = document.body;
const searchBox = document.getElementById('search-box') as HTMLInputElement | null;
const results = document.getElementById('results') as HTMLElement | null;

if (openModal && modal && closeBtn) {
    openModal.onclick = function () {
        modal.style.display = "block";
    };
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
    });
}

const API_KEY: string = 'AIzaSyDfFr3mb1R0EhvZ8MfbvYH4jC7QWh8658A';
const ENDPOINT_URL: string = 'https://www.googleapis.com/youtube/v3/search';

if (searchBox && results) {
    searchBox.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const query: string = target.value;
        const request: string = `${ENDPOINT_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`;

        fetch(request)
            .then(response => response.json())
            .then((data: { items: any[] }) => {
                const items = data.items;
                renderResults(items);
            });
    });
}

function renderResults(items: any[]) {
    if (!results) return;
    results.innerHTML = '';

    items.forEach(item => {
        const title: string = item.snippet.title;
        const description: string = item.snippet.description;
        const videoId: string = item.id.videoId;
        const thumbnailUrl: string = item.snippet.thumbnails.medium.url;
        const downloadLink: string = `<a href="https://www.youtube.com/watch?v=${videoId}&feature=youtu.be" download>${title}</a>`;

        const html: string = `
      <div>
        <img src="${thumbnailUrl}">
        <div>
          <h2>${downloadLink}</h2>
          <p>${description}</p>
        </div>
      </div>
      <h2>
      <iframe width="642" height="361" src="https://www.youtube.com/embed/${videoId}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </h2>
    `;

        results.insertAdjacentHTML('beforeend', html);
    });
}

function addShapes() {
    const container = document.querySelector('.container') as HTMLElement | null;
    if (container) {
        for (let i = 0; i < 6; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape');
            shape.style.animationDelay = `${i * 0.3}s`;
            container.appendChild(shape);
        }
    }
}

addShapes();
