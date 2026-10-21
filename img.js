// Rechtermuisknop (opslaan) en slepen blokkeren op alle afbeeldingen
document.addEventListener('DOMContentLoaded', () => {
    // Blokkeer rechtermuisknop op afbeeldingen
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Extra beveiliging tegen drag & drop op afbeeldingen
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
});