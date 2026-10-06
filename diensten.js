// Instellingen
const ONTVANGER_EMAIL = "info@roelandlenoir.com";

// Elementen ophalen uit de HTML
const pakketButtons = document.querySelectorAll('.pakket-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const emailModal = document.getElementById('emailModal');
const copyTextBtn = document.getElementById('copyTextBtn');

const voornaamInput = document.getElementById('voornaam');
const pakketSelect = document.getElementById('pakket');
const rotterdamCheckbox = document.getElementById('rotterdam');
const rotterdamLabel = document.querySelector('label[for="rotterdam"]');
const bijzonderhedenInput = document.getElementById('bijzonderheden');
const mailtoBtn = document.getElementById('mailtoBtn');
const mailPreview = document.getElementById('mailPreview');

// 1. POP-UP OPENEN EN SLUITEN LOGICA
pakketButtons.forEach(button => {
    button.addEventListener('click', () => {
        const gekozenPakket = button.getAttribute('data-pakket');

        if (gekozenPakket) {
            pakketSelect.value = gekozenPakket;
        }

        updateMailtoLink();
        emailModal.classList.add('active');
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        emailModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === emailModal) {
        emailModal.classList.remove('active');
    }
});

// 2. DYNAMISCHE DUBBELTALIGE MAIL INHOUD GENEREREN
function generateMailContent() {
    // Check de actieve taal (standaard 'nl')
    const lang = document.documentElement.lang || 'nl';
    const t = translations[lang] || translations['nl'];

    const voornaam = voornaamInput.value.trim();
    const pakket = pakketSelect.value;
    const naarRotterdam = rotterdamCheckbox.checked;
    const bijzonderheden = bijzonderhedenInput.value.trim();

    let rotterdamTekst = "";

    if (naarRotterdam) {
        if (rotterdamLabel) {
            rotterdamLabel.textContent = t.rotterdam_label_ja;
        }
        rotterdamTekst = t.rotterdam_tekst_ja;
    } else {
        if (rotterdamLabel) {
            rotterdamLabel.textContent = t.rotterdam_label_nee;
        }
        rotterdamTekst = t.rotterdam_tekst_nee;
    }

    let bijzonderhedenTekst = bijzonderheden !== "" ? `\n\n${bijzonderheden}` : "";
    const afzenderNaam = voornaam || t.mail_geen_naam;

    const bodyText = `${t.mail_aanhef}

${t.mail_body_start} ${pakket}, ${rotterdamTekst}${bijzonderhedenTekst}

${t.mail_afsluiting}${afzenderNaam}`;

    return { voornaam, bodyText, onderwerp: t.mail_onderwerp };
}

// 3. MAILTO LINK & PREVIEW BIJWERKEN
function updateMailtoLink() {
    const { voornaam, bodyText, onderwerp } = generateMailContent();

    if (mailPreview) {
        mailPreview.textContent = bodyText;
    }

    if (voornaam !== "") {
        mailtoBtn.classList.remove('uitgeschakeld');
        const mailtoUrl = `mailto:${ONTVANGER_EMAIL}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(bodyText)}`;
        mailtoBtn.setAttribute('href', mailtoUrl);
    } else {
        mailtoBtn.classList.add('uitgeschakeld');
        mailtoBtn.setAttribute('href', '#');
    }
}

// 4. KOPIEERKNOP FUNCTIONALITEIT
if (copyTextBtn) {
    copyTextBtn.addEventListener('click', () => {
        const { bodyText } = generateMailContent();
        navigator.clipboard.writeText(bodyText).then(() => {
            const originalText = copyTextBtn.textContent;
            const lang = document.documentElement.lang || 'nl';

            copyTextBtn.textContent = lang === 'en' ? "Copied!" : "Gekopieerd!";
            copyTextBtn.style.backgroundColor = "#c2f0c2";

            setTimeout(() => {
                copyTextBtn.textContent = originalText;
                copyTextBtn.style.backgroundColor = "";
            }, 2000);
        });
    });
}

// Luisteren naar veranderingen in het formulier
voornaamInput.addEventListener('input', updateMailtoLink);
pakketSelect.addEventListener('change', updateMailtoLink);
rotterdamCheckbox.addEventListener('change', updateMailtoLink);
bijzonderhedenInput.addEventListener('input', updateMailtoLink);

// Direct initialiseren
updateMailtoLink();
