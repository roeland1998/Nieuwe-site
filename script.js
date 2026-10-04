const menuToggle = document.getElementById('menu-toggle');
const navbarMenu = document.querySelector('.navbarmenu');

if (menuToggle && navbarMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const gridContainer = document.querySelector('.grid');

// Functie om de elementen willekeurig te husselen (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Functie om de foto's te husselen en te filteren
function filterAndShuffle(selectedCategory) {
    // 1. Hussel de lijst met gallery-items willekeurig
    const shuffledItems = shuffleArray([...galleryItems]);

    // 2. Voeg de gehusselde items opnieuw toe aan de DOM (verandert de volgorde)
    shuffledItems.forEach(item => {
        gridContainer.appendChild(item);

        const itemCategories = item.getAttribute('data-category') || '';

        // 3. Toon of verberg items op basis van de gekozen categorie
        // (.split(/\s+/) zorgt dat 'portet' of 'portret' netjes op losse woorden wordt gematcht)
        const categoriesArray = itemCategories.split(/\s+/);

        if (selectedCategory === 'all' || categoriesArray.includes(selectedCategory)) {
            item.classList.remove('is-hidden');
        } else {
            item.classList.add('is-hidden');
        }
    });
}

// Event listeners toevoegen aan de filterknoppen
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter');
        filterAndShuffle(selectedCategory);
    });
});

// Optioneel: Hussel de foto's ook direct bij het eerste laden van de pagina
filterAndShuffle('all');