// Rechtermuisknop en slepen blokkeren op alle gallery-items en foto's
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('fotoingrid') || e.target.closest('.gallery-item') || e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
}, true);

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('fotoingrid') || e.target.closest('.gallery-item') || e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
}, true);