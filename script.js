const menuToggle = document.getElementById('menu-toggle');
const navbarMenu = document.querySelector('.navbarmenu');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategories = item.getAttribute('data-category');

            if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });
    });
});