      var openModal = document.getElementById("open-modal");
      var modal = document.getElementById("modal");
      var closeBtn = document.getElementById("close");
      
      openModal.onclick = function() {
        modal.style.display = "block";
      };
      
      closeBtn.onclick = function() {
        modal.style.display = "none";
      };
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", function() {
	body.classList.toggle("dark-mode");
});
// APIキーを設定
const API_KEY = 'AIzaSyDfFr3mb1R0EhvZ8MfbvYH4jC7QWh8658A';

// エンドポイントURLを設定
const ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search';
const searchBox = document.getElementById('search-box');
const results = document.getElementById('results');

searchBox.addEventListener('change', (event) => {
    const query = event.target.value;

    // APIリクエストを作成
    const request = `${ENDPOINT_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    // APIリクエストを送信
    fetch(request)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            renderResults(items);
        });
});
function renderResults(items) {
    results.innerHTML = '';

    items.forEach(item => {
        // 動画タイトルと説明を取得
        const title = item.snippet.title;
        const description = item.snippet.description;

        // 動画IDを取得
        const videoId = item.id.videoId;

        // 動画サムネイルのURLを取得
        const thumbnailUrl = item.snippet.thumbnails.medium.url;

        // 動画のダウンロードリンクを作成
        const downloadLink = `<a href="https://www.youtube.com/watch?v=${videoId}&feature=youtu.be" download>${title}</a>`;

        // HTMLを作成
        const html = `
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
      const container = document.querySelector('.container');
      for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shape.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(shape);
      }
    }

    addShapes();
