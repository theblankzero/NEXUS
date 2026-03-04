// DOM Elements - Navigation & Views
const tabDiscover = document.getElementById('tabDiscover');
const tabHealth = document.getElementById('tabHealth');
const tabSales = document.getElementById('tabSales');
const tabCategories = document.getElementById('tabCategories');
const discoverView = document.getElementById('discoverView');
const healthView = document.getElementById('healthView');
const salesView = document.getElementById('salesView');
const mainIcon = document.getElementById('main-icon');
const mainSpan = document.getElementById('main-span');
const footerIcon = document.getElementById('footer-icon');
const footerSpan = document.getElementById('footer-span');

// Global Search
const searchInput = document.getElementById('searchInput');
let currentSearch = '';

// Discover Mode Elements & State
const gameGrid = document.getElementById('gameGrid');
const noResults = document.getElementById('noResults');
const genreBtns = document.querySelectorAll('.filter-group-genre .filter-btn');
const styleBtns = document.querySelectorAll('.filter-group-style .filter-btn');
const platformBtns = document.querySelectorAll('.filter-group-platform .filter-btn');

let currentGenre = 'all';
let currentStyle = 'all';
let currentPlatform = 'all';

// Sales Mode Elements & State
const salesGrid = document.getElementById('salesGrid');

// Health Mode Elements & State
const healthGrid = document.getElementById('healthGrid');
const healthNoResults = document.getElementById('healthNoResults');
const healthGenreBtns = document.querySelectorAll('.filter-group-health-genre .filter-btn');

let currentHealthGenre = 'all';

// ============================================
// TAB NAVIGATION LOGIC (SPA)
// ============================================

function switchTab(mode) {
    if (mode === 'discover') {
        discoverView.classList.add('active-view');
        healthView.classList.remove('active-view');
        salesView.classList.remove('active-view');
        tabDiscover.classList.add('active');
        tabHealth.classList.remove('active');
        tabSales.classList.remove('active');

        // Update branding colors/text
        mainIcon.className = 'fa-solid fa-gamepad';
        mainSpan.textContent = 'VAULT';
        footerIcon.className = 'fa-solid fa-gamepad';
        footerSpan.textContent = 'VAULT';

    } else if (mode === 'health') {
        healthView.classList.add('active-view');
        discoverView.classList.remove('active-view');
        salesView.classList.remove('active-view');
        tabHealth.classList.add('active');
        tabDiscover.classList.remove('active');
        tabSales.classList.remove('active');

        // Update branding colors/text to health theme
        mainIcon.className = 'fa-solid fa-brain';
        mainSpan.textContent = 'HEALTH';
        footerIcon.className = 'fa-solid fa-brain';
        footerSpan.textContent = 'HEALTH';
    } else if (mode === 'sales') {
        salesView.classList.add('active-view');
        discoverView.classList.remove('active-view');
        healthView.classList.remove('active-view');
        tabSales.classList.add('active');
        tabDiscover.classList.remove('active');
        tabHealth.classList.remove('active');

        // Update branding colors/text to sales theme
        mainIcon.className = 'fa-solid fa-fire';
        mainSpan.textContent = 'DEALS';
        footerIcon.className = 'fa-solid fa-fire';
        footerSpan.textContent = 'DEALS';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabDiscover.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('discover');
});

tabCategories.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('discover');
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
});

tabHealth.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('health');
});

tabSales.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('sales');
});


// ============================================
// DISCOVER MODE LOGIC
// ============================================

function getPlatformInfo(platformStr, gameUrl) {
    let platformsHtml = '';

    if (platformStr.toLowerCase().includes('pc') || platformStr.toLowerCase().includes('windows')) {
        let isMac = (gameUrl && gameUrl.length % 2 === 0);
        platformsHtml += `
            <a href="${gameUrl}" target="_blank" rel="noopener noreferrer" class="platform-link platform-steam">
                <i class="fa-brands fa-windows"></i>${isMac ? ' <i class="fa-brands fa-apple" style="margin-left: 6px;"></i>' : ''} Get for PC
            </a>
        `;
    }
    if (platformStr.toLowerCase().includes('browser') || platformStr.toLowerCase().includes('web')) {
        platformsHtml += `
            <a href="${gameUrl}" target="_blank" rel="noopener noreferrer" class="platform-link platform-xbox" style="background: rgba(200, 100, 20, 0.3)">
                <i class="fa-solid fa-globe"></i> Play in Browser
            </a>
        `;
    }
    if (!platformsHtml) {
        platformsHtml += `
            <a href="${gameUrl}" target="_blank" rel="noopener noreferrer" class="platform-link platform-epic">
                <i class="fa-solid fa-gamepad"></i> Play Now
            </a>
        `;
    }
    return platformsHtml;
}

function renderGames(games) {
    gameGrid.innerHTML = '';

    if (games.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    const displayGames = games.slice(0, 100);

    displayGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card pokemon-card';

        let genreClass = game.genre ? game.genre.toLowerCase().replace(/\s+/g, '-') : 'default';
        const genresHTML = `<span class="genre-tag ${genreClass}">${game.genre}</span>`;
        const platformsHTML = getPlatformInfo(game.platform, game.game_url);

        // Use dynamically allocated playStyle
        const styleText = game.playStyle || "Multifaceted";

        card.classList.add('flip-container');

        const dop = game.dopamine || 50;
        const adr = game.adrenaline || 50;
        const foc = game.focus || 50;
        const rsk = game.healthRisk || "Low risk of physical strain. Recommend taking breaks.";
        const bft = game.healthBenefit || "Provides mild cognitive stimulation.";

        card.innerHTML = `
            <div class="flipper">
                <!-- FRONT OF CARD -->
                <div class="card-front">
                    <div class="card-header">
                        <h3 class="franchise-title">${game.title}</h3>
                        <div class="hp-stat"><small>HP</small> ${game.hp || 120} <i class="fa-solid fa-bolt" style="color:#d4af37; margin-left:4px;"></i></div>
                    </div>
                    <div class="image-wrapper">
                        <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
                    </div>
                    <div class="card-stats-bar">
                        <span class="stat-item"><i class="fa-solid fa-layer-group"></i> ${game.publisher.substring(0, 15)}</span>
                        <span class="stat-item"><i class="fa-solid fa-user-group"></i> ${styleText}</span>
                    </div>
                    <div class="card-content">
                        <div class="attack-row">
                            ${genresHTML}
                            <div class="attack-desc">${game.short_description}</div>
                        </div>
                        <div class="weakness-row">
                            <div class="platforms-title">Access</div>
                            <div class="platforms">
                                ${platformsHTML}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BACK OF CARD (BRAIN IMPACT) -->
                <div class="card-back" style="display: flex; flex-direction: column;">
                    <div class="card-header" style="border-bottom: 2px solid var(--accent-primary);">
                        <h3 class="franchise-title" style="color: var(--accent-primary);"><i class="fa-solid fa-head-side-pulse"></i> ${game.title}</h3>
                        <div class="hp-stat" style="color:#000;"><small>HP</small> ${game.hp || 120}</div>
                    </div>
                    
                    <div class="card-content" style="background: rgba(255,255,255,0.3); padding-top: 0; flex-grow: 1;">
                        <div class="brain-stats">
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Dopamine</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-dopamine" style="width: ${dop}%;"></div></div>
                                <span class="brain-stat-val">${dop}%</span>
                            </div>
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Adrenaline</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-adrenaline" style="width: ${adr}%;"></div></div>
                                <span class="brain-stat-val">${adr}%</span>
                            </div>
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Focus</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-focus" style="width: ${foc}%;"></div></div>
                                <span class="brain-stat-val">${foc}%</span>
                            </div>
                        </div>

                        <div class="health-benefit">
                            <i class="fa-solid fa-arrow-up-right-dots"></i> <strong>BENEFIT:</strong> ${bft}
                        </div>
                        
                        <div class="health-risk">
                            <i class="fa-solid fa-triangle-exclamation"></i> <strong>RISK:</strong> ${rsk}
                        </div>
                    </div>
                    
                    <div class="image-wrapper" style="height: 100px; padding: 0.5rem;">
                        <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" style="height:80px; filter: grayscale(50%);" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
                    </div>
                </div>
            </div>
        `;

        // Add Flip Event Listener
        card.addEventListener('click', function (e) {
            // Check if user is clicking on a link (don't flip if clicking download link)
            if (!e.target.closest('.platform-link')) {
                card.classList.toggle('flipped');
            }
        });

        gameGrid.appendChild(card);
    });
}

function applyDiscoverFilters() {
    let filteredGames = massiveGamesData;

    // Search
    if (currentSearch) {
        filteredGames = filteredGames.filter(game => {
            return (game.title && game.title.toLowerCase().includes(currentSearch)) ||
                (game.short_description && game.short_description.toLowerCase().includes(currentSearch)) ||
                (game.genre && game.genre.toLowerCase().includes(currentSearch)) ||
                (game.developer && game.developer.toLowerCase().includes(currentSearch)) ||
                (game.publisher && game.publisher.toLowerCase().includes(currentSearch));
        });
    }

    if (currentGenre !== 'all') {
        filteredGames = filteredGames.filter(game => game.genre && game.genre.toLowerCase().includes(currentGenre));
    }

    if (currentStyle !== 'all') {
        filteredGames = filteredGames.filter(game => game.playStyle && game.playStyle.toLowerCase() === currentStyle);
    }

    if (currentPlatform !== 'all') {
        filteredGames = filteredGames.filter(game => game.platform && game.platform.toLowerCase().includes(currentPlatform));
    }

    renderGames(filteredGames);
}


// ============================================
// HEALTH MODE LOGIC
// ============================================

function renderBrainGames(games) {
    healthGrid.innerHTML = '';

    if (games.length === 0) {
        healthNoResults.style.display = 'block';
        return;
    }
    healthNoResults.style.display = 'none';

    const displayGames = games.slice(0, 50);

    displayGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card pokemon-card';

        const dop = game.dopamine || 50;
        const adr = game.adrenaline || 50;
        const foc = game.focus || 50;
        const rsk = game.healthRisk || "Low risk of physical strain. Recommend taking breaks.";
        const bft = game.healthBenefit || "Provides mild cognitive stimulation.";
        let genreClass = game.genre ? game.genre.toLowerCase().replace(/\s+/g, '-') : 'default';

        card.classList.add('flip-container', 'flipped');
        const styleText = game.playStyle || "Multifaceted";

        const genresHTML = `<span class="genre-tag ${genreClass}">${game.genre}</span>`;
        const platformsHTML = getPlatformInfo(game.platform, game.game_url);

        card.innerHTML = `
            <div class="flipper">
                <!-- FRONT OF CARD -->
                <div class="card-front">
                    <div class="card-header">
                        <h3 class="franchise-title">${game.title}</h3>
                        <div class="hp-stat"><small>HP</small> ${game.hp || 120} <i class="fa-solid fa-bolt" style="color:#d4af37; margin-left:4px;"></i></div>
                    </div>
                    <div class="image-wrapper">
                        <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
                    </div>
                    <div class="card-stats-bar">
                        <span class="stat-item"><i class="fa-solid fa-layer-group"></i> ${game.publisher.substring(0, 15)}</span>
                        <span class="stat-item"><i class="fa-solid fa-user-group"></i> ${styleText}</span>
                    </div>
                    <div class="card-content">
                        <div class="attack-row">
                            ${genresHTML}
                            <div class="attack-desc">${game.short_description}</div>
                        </div>
                        <div class="weakness-row">
                            <div class="platforms-title">Access</div>
                            <div class="platforms">
                                ${platformsHTML}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BACK OF CARD (BRAIN IMPACT) -->
                <div class="card-back" style="display: flex; flex-direction: column;">
                    <div class="card-header" style="border-bottom: 2px solid var(--accent-primary);">
                        <h3 class="franchise-title" style="color: var(--accent-primary);"><i class="fa-solid fa-head-side-pulse"></i> ${game.title}</h3>
                        <div class="hp-stat" style="color:#000;"><small>HP</small> ${game.hp || 120}</div>
                    </div>
                    
                    <div class="card-content" style="background: rgba(255,255,255,0.3); padding-top: 0; flex-grow: 1;">
                        <div class="brain-stats">
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Dopamine</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-dopamine" style="width: ${dop}%;"></div></div>
                                <span class="brain-stat-val">${dop}%</span>
                            </div>
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Adrenaline</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-adrenaline" style="width: ${adr}%;"></div></div>
                                <span class="brain-stat-val">${adr}%</span>
                            </div>
                            <div class="brain-stat-row">
                                <span class="brain-stat-label">Focus</span>
                                <div class="brain-stat-bar-bg"><div class="brain-stat-bar-fill fill-focus" style="width: ${foc}%;"></div></div>
                                <span class="brain-stat-val">${foc}%</span>
                            </div>
                        </div>

                        <div class="health-benefit">
                            <i class="fa-solid fa-arrow-up-right-dots"></i> <strong>BENEFIT:</strong> ${bft}
                        </div>
                        
                        <div class="health-risk">
                            <i class="fa-solid fa-triangle-exclamation"></i> <strong>RISK:</strong> ${rsk}
                        </div>
                    </div>
                    
                    <div class="image-wrapper" style="height: 100px; padding: 0.5rem;">
                        <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" style="height:80px; filter: grayscale(50%);" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
                    </div>
                </div>
            </div>
        `;

        // Add Flip Event Listener
        card.addEventListener('click', function (e) {
            // Check if user is clicking on a link (don't flip if clicking download link)
            if (!e.target.closest('.platform-link')) {
                card.classList.toggle('flipped');
            }
        });
        healthGrid.appendChild(card);
    });
}

function applyHealthFilters() {
    let filteredGames = massiveGamesData;

    if (currentSearch) {
        filteredGames = filteredGames.filter(game => {
            return (game.title && game.title.toLowerCase().includes(currentSearch)) ||
                (game.genre && game.genre.toLowerCase().includes(currentSearch));
        });
    }

    if (currentHealthGenre !== 'all') {
        filteredGames = filteredGames.filter(game => game.genre && game.genre.toLowerCase().includes(currentHealthGenre));
    }

    renderBrainGames(filteredGames);
}


// ============================================
// SALES MODE LOGIC
// ============================================

function renderSalesGames(games) {
    if (!salesGrid) return;
    salesGrid.innerHTML = '';

    // Pick a random subset of 30 games to pretend they are "On Sale"
    const salesSubset = [...games].sort(() => 0.5 - Math.random()).slice(0, 30);

    salesSubset.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'card pokemon-card';

        let genreClass = game.genre ? game.genre.toLowerCase().replace(/\s+/g, '-') : 'default';
        const platformsHTML = getPlatformInfo(game.platform, game.game_url);

        // Discount Generator
        const originalPrice = (Math.random() * 40 + 10).toFixed(2); // $10 to $50
        const discountPercent = Math.floor(Math.random() * 60) + 15; // 15% to 75%
        const newPrice = (originalPrice * (1 - discountPercent / 100)).toFixed(2);

        card.innerHTML = `
            <div class="card-header" style="border-bottom: 2px solid #ffaa00;">
                <h3 class="franchise-title" style="color: #ffaa00;"><i class="fa-solid fa-tag"></i> ${game.title}</h3>
                <div class="hp-stat" style="color: #ff0000; font-weight: 900; font-size: 1.1rem;">-${discountPercent}%</div>
            </div>
            <div class="image-wrapper">
                <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
                <div style="position: absolute; bottom: 0; left: 0; background: rgba(0,0,0,0.8); color: #fff; padding: 5px 10px; font-weight: bold; width: 100%; display: flex; justify-content: space-between;">
                    <span style="text-decoration: line-through; color: #888; font-size: 0.8rem;">$${originalPrice}</span>
                    <span style="color: #00ff00;">$${newPrice}</span>
                </div>
            </div>
            <div class="card-stats-bar" style="background: #333; color: #fff; border: 1px solid #ffaa00;">
                <span class="stat-item"><i class="fa-solid fa-clock"></i> Ends in ${Math.floor(Math.random() * 48) + 2}h</span>
                <span class="stat-item"><i class="fa-solid fa-layer-group"></i> ${game.publisher.substring(0, 10)}</span>
            </div>
            <div class="card-content">
                <div class="attack-row">
                    <span class="genre-tag ${genreClass}">${game.genre}</span>
                    <div class="attack-desc">${game.short_description}</div>
                </div>
                <div class="weakness-row">
                    <div class="platforms-title">Access Premium Content</div>
                    <div class="platforms">
                        ${platformsHTML}
                    </div>
                </div>
            </div>
        `;
        salesGrid.appendChild(card);
    });
}

// ============================================
// INITIALIZATION AND EVENT BINDING
// ============================================
if (typeof massiveGamesData !== 'undefined' && massiveGamesData.length > 0) {
    renderGames(massiveGamesData);
    renderBrainGames(massiveGamesData);
    renderSalesGames(massiveGamesData);

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        applyDiscoverFilters();
        applyHealthFilters();
    });

    // Binding Discover Filters
    genreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenre = btn.getAttribute('data-filter');
            applyDiscoverFilters();
        });
    });

    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            styleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStyle = btn.getAttribute('data-style');
            applyDiscoverFilters();
        });
    });

    platformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            platformBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlatform = btn.getAttribute('data-platform');
            applyDiscoverFilters();
        });
    });

    // Binding Health Filters
    healthGenreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            healthGenreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentHealthGenre = btn.getAttribute('data-filter');
            applyHealthFilters();
        });
    });

} else {
    gameGrid.innerHTML += `<p style="color:red; text-align:center;">Failed to load live database. Ensure assets/data.js and data-augment.js exist.</p>`;
    healthGrid.innerHTML += `<p style="color:red; text-align:center;">Failed to load live database. Ensure assets/data.js and data-augment.js exist.</p>`;
}
