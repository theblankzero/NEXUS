// DOM Elements
const gameGrid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
const genreBtns = document.querySelectorAll('.filter-group-genre .filter-btn');
const noResults = document.getElementById('noResults');

let currentSearch = '';
let currentGenre = 'all';

// Render Cards with Health Metrics
function renderBrainGames(games) {
    gameGrid.innerHTML = '';

    if (games.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    const displayGames = games.slice(0, 50); // Show top 50 to prevent overload

    displayGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card pokemon-card';

        // Ensure values exist safely
        const dop = game.dopamine || 50;
        const adr = game.adrenaline || 50;
        const foc = game.focus || 50;
        const rsk = game.healthRisk || "Low risk of physical strain. Recommend taking breaks.";
        const bft = game.healthBenefit || "Provides mild cognitive stimulation.";

        let genreClass = game.genre ? game.genre.toLowerCase().replace(/\s+/g, '-') : 'default';

        card.innerHTML = `
            <div class="card-header" style="border-bottom: 2px solid var(--accent-primary);">
                <h3 class="franchise-title" style="color: var(--accent-primary);"><i class="fa-solid fa-head-side-pulse"></i> ${game.title}</h3>
                <div class="hp-stat" style="color:#000;"><small>HP</small> ${game.hp || 120}</div>
            </div>
            
            <div class="card-content" style="background: rgba(255,255,255,0.3); padding-top: 0;">
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
            
            <div class="image-wrapper" style="height: 100px;">
                <img src="${game.thumbnail}" alt="${game.title}" class="card-image" loading="lazy" style="height:80px; filter: grayscale(50%);" onerror="this.src='https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80'">
            </div>
        `;

        gameGrid.appendChild(card);
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

    if (currentGenre !== 'all') {
        filteredGames = filteredGames.filter(game =>
            game.genre && game.genre.toLowerCase().includes(currentGenre)
        );
    }

    renderBrainGames(filteredGames);
}

// Ensure massiveGamesData exists
if (typeof massiveGamesData !== 'undefined' && massiveGamesData.length > 0) {
    renderBrainGames(massiveGamesData);

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        applyHealthFilters();
    });

    genreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenre = btn.getAttribute('data-filter');
            applyHealthFilters();
        });
    });

} else {
    gameGrid.innerHTML += `<p style="color:red; text-align:center;">Failed to structure neural data. Ensure assets/data-augment.js is loaded.</p>`;
}
