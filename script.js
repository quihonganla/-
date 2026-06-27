document.addEventListener('DOMContentLoaded', function() {
    // 1. 導覽列自動高亮當前頁面邏輯
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. 首頁邏輯：點擊季節卡片
    const seasonCards = document.querySelectorAll('.season-card');
    seasonCards.forEach(card => {
        card.addEventListener('click', function() {
            const seasonValue = this.getAttribute('data-season');
            localStorage.setItem('trip_season', seasonValue); // 儲存季節
            window.location.href = 'map.html'; // 前往地圖頁
        });
    });

    // 3. 地圖頁邏輯：顯示選擇的季節與點擊景點
    const currentSeasonSpan = document.getElementById('current-season');
    if (currentSeasonSpan) {
        const savedSeason = localStorage.getItem('trip_season') || '未選擇季節';
        currentSeasonSpan.innerText = savedSeason;
    }

    const spotCards = document.querySelectorAll('.spot-card');
    spotCards.forEach(card => {
        card.addEventListener('click', function() {
            const spotValue = this.getAttribute('data-spot');
            localStorage.setItem('trip_spot', spotValue); // 儲存景點
            window.location.href = 'recommend.html'; // 前往行程偏好頁
        });
    });

    // 4. 行程偏好頁邏輯：顯示景點與表單送出
    const currentSpotSpan = document.getElementById('current-spot');
    if (currentSpotSpan) {
        const savedSpot = localStorage.getItem('trip_spot') || '未選擇景點';
        currentSpotSpan.innerText = savedSpot;
    }

    const preferenceForm = document.getElementById('preference-form');
    if (preferenceForm) {
        preferenceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 讀取並儲存下拉選單數值
            localStorage.setItem('trip_hotel', document.getElementById('hotel').value);
            localStorage.setItem('trip_transport', document.getElementById('transport').value);
            localStorage.setItem('trip_route', document.getElementById('route').value);
            
            window.location.href = 'result.html'; // 前往規劃結果頁
        });
    }

    // 5. 結果顯示頁邏輯：將所有快取資料繪製至頁面
    const resultCard = document.getElementById('result-card');
    const noDataAlert = document.getElementById('no-data-alert');
    
    if (resultCard && noDataAlert) {
        const season = localStorage.getItem('trip_season');
        const spot = localStorage.getItem('trip_spot');
        const hotel = localStorage.getItem('trip_hotel');
        const transport = localStorage.getItem('trip_transport');
        const route = localStorage.getItem('trip_route');

        // 判斷是否具備完整旅遊資料
        if (season && spot && hotel && transport && route) {
            document.getElementById('res-season').innerText = season;
            document.getElementById('res-spot').innerText = spot;
            document.getElementById('res-hotel').innerText = hotel;
            document.getElementById('res-transport').innerText = transport;
            document.getElementById('res-route').innerText = route;

            noDataAlert.style.display = 'none';
            resultCard.style.display = 'block';
        } else {
            noDataAlert.style.display = 'block';
            resultCard.style.display = 'none';
        }
    }

    // 重新開始規劃按鈕
    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            localStorage.clear(); // 清空所有快取紀錄
            window.location.href = 'index.html';
        });
    }

    // 6. 聯絡表單防呆提交
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感謝您的訊息！我們很快會由專業客服為您解答旅遊細節。');
            this.reset();
        });
    }
});