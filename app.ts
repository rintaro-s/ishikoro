// 型定義を追加
const openModal = document.getElementById("open-modal") as HTMLElement | null;
const modal = document.getElementById("modal") as HTMLElement | null;
const closeBtn = document.getElementById("close") as HTMLElement | null;
const toggleBtn = document.getElementById("mode-toggle") as HTMLElement | null;
const body = document.body;
const searchBox = document.getElementById('search-box') as HTMLInputElement | null;
const results = document.getElementById('results') as HTMLElement | null;

// モーダルの開閉処理
if (openModal && modal && closeBtn) {
    openModal.onclick = function () {
        modal.style.display = "block";
    };
    
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
}

// モード切替の処理
if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
    });
}

// APIキーとエンドポイントURLの設定
const API_KEY: string = 'AIzaSyDfFr3mb1R0EhvZ8MfbvYH4jC7QWh8658A';
const ENDPOINT_URL: string = 'https://www.googleapis.com/youtube/v3/search';

// APIリクエストと結果表示処理
if (searchBox && results) {
    searchBox.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const query: string = target.value;
        
        // APIリクエストの作成
        const request: string = `${ENDPOINT_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`;
        
        // APIリクエストの送信
        fetch(request)
            .then(response => response.json())
            .then((data: { items: any[] }) => {
                const items = data.items;
                renderResults(items);
            });
    });
}

// 検索結果の表示
function renderResults(items: any[]) {
    if (!results) return;

    results.innerHTML = '';

    items.forEach(item => {
        // 動画タイトルと説明を取得
        const title: string = item.snippet.title;
        const description: string = item.snippet.description;

        // 動画IDを取得
        const videoId: string = item.id.videoId;

        // 動画サムネイルのURLを取得
       
