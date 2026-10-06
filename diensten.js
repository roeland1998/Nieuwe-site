// Instellingen
const ONTVANGER_EMAIL = "info@roelandlenoir.com";

// Elementen ophalen uit de HTML
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

// 1. POP-UP OPENEN EN SLUITEN LOGICA (Event Delegation)
document.addEventListener('click', (e) => {
    // Zoek naar de dichtstbijzijnde knop met class .pakket-btn
    const button = e.target.closest('.pakket-btn');

    if (button) {
        e.preventDefault();
        const gekozenPakket = button.getAttribute('data-pakket');

        if (gekozenPakket && pakketSelect) {
            pakketSelect.value = gekozenPakket;
        }

        updateMailtoLink();
        if (emailModal) {
            emailModal.classList.add('active');
        }
    }
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (emailModal) emailModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === emailModal) {
        emailModal.classList.remove('active');
    }
});

// 2. DYNAMISCHE DUBBELTALIGE MAIL INHOUD GENEREREN (met Fallbacks tegen crashes)
function generateMailContent() {
    // Check de actieve taal (standaard 'nl')
    const lang = document.documentElement.lang || 'nl';

    // Zorg voor een fallback als 'translations' nog niet geladen is of de sleutel ontbreekt
    const translationsObj = (typeof translations !== 'undefined') ? translations : {};
    const t = translationsObj[lang] || translationsObj['nl'] || {};

    const voornaam = voornaamInput ? voornaamInput.value.trim() : "";
    const pakket = pakketSelect ? pakketSelect.value : "";
    const naarRotterdam = rotterdamCheckbox ? rotterdamCheckbox.checked : false;
    const bijzonderheden = bijzonderhedenInput ? bijzonderhedenInput.value.trim() : "";

    // Fallback teksten voor als de vertaalvariabelen niet beschikbaar zijn
    const rotterdam_label_ja = t.rotterdam_label_ja || "Mogelijkheid om naar Rotterdam te komen";
    const rotterdam_label_nee = t.rotterdam_label_nee || "Kan niet naar Rotterdam komen";
    const rotterdam_tekst_ja = t.rotterdam_tekst_ja || "ik kan naar Rotterdam komen voor de shoot.";
    const rotterdam_tekst_nee = t.rotterdam_tekst_nee || "ik kan niet naar Rotterdam komen, laten we overleggen over de locatie.";

    const mail_aanhef = t.mail_aanhef || "Hoi Roeland,";
    const mail_body_start = t.mail_body_start || "Ik wil graag een fotoshoot boeken voor het pakket:";
    const mail_afsluiting = t.mail_afsluiting || "Met vriendelijke groet,\n";
    const mail_geen_naam = t.mail_geen_naam || "[Je naam]";
    const mail_onderwerp = t.mail_onderwerp || "Aanvraag fotoshoot via website";

    let rotterdamTekst = "";

    if (naarRotterdam) {
        if (rotterdamLabel) rotterdamLabel.textContent = rotterdam_label_ja;
        rotterdamTekst = rotterdam_tekst_ja;
    } else {
        if (rotterdamLabel) rotterdamLabel.textContent = rotterdam_label_nee;
        rotterdamTekst = rotterdam_tekst_nee;
    }

    let bijzonderhedenTekst = bijzonderheden !== "" ? `\n\n${bijzonderheden}` : "";
    const afzenderNaam = voornaam || mail_geen_naam;

    const bodyText = `${mail_aanhef}

${mail_body_start} ${pakket}, ${rotterdamTekst}${bijzonderhedenTekst}

${mail_afsluiting}${afzenderNaam}`;

    return { voornaam, bodyText, onderwerp: mail_onderwerp };
}

// 3. MAILTO LINK & PREVIEW BIJWERKEN
function updateMailtoLink() {
    const { voornaam, bodyText, onderwerp } = generateMailContent();

    if (mailPreview) {
        mailPreview.textContent = bodyText;
    }

    if (mailtoBtn) {
        if (voornaam !== "") {
            mailtoBtn.classList.remove('uitgeschakeld');
            const mailtoUrl = `mailto:${ONTVANGER_EMAIL}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(bodyText)}`;
            mailtoBtn.setAttribute('href', mailtoUrl);
        } else {
            mailtoBtn.classList.add('uitgeschakeld');
            mailtoBtn.setAttribute('href', '#');
        }
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
if (voornaamInput) voornaamInput.addEventListener('input', updateMailtoLink);
if (pakketSelect) pakketSelect.addEventListener('change', updateMailtoLink);
if (rotterdamCheckbox) rotterdamCheckbox.addEventListener('change', updateMailtoLink);
if (bijzonderhedenInput) bijzonderhedenInput.addEventListener('input', updateMailtoLink);

// Direct initialiseren
updateMailtoLink();