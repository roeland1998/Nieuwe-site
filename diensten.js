// Instellingen
const ONTVANGER_EMAIL = "info@roelandlenoir.com";
const EMAIL_ONDERWERP = "Aanvraag portretshoot";

// Elementen ophalen uit de HTML
const pakketButtons = document.querySelectorAll('.pakket-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const emailModal = document.getElementById('emailModal');
const copyTextBtn = document.getElementById('copyTextBtn');

const voornaamInput = document.getElementById('voornaam');
const pakketSelect = document.getElementById('pakket');
const rotterdamCheckbox = document.getElementById('rotterdam');
// Het label van de rotterdam-schakelaar ophalen:
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

// 2. MAIL INHOUD GENEREREN
function generateMailContent() {
    const voornaam = voornaamInput.value.trim();
    const pakket = pakketSelect.value;
    const naarRotterdam = rotterdamCheckbox.checked;
    const bijzonderheden = bijzonderhedenInput.value.trim();

    // Tekst op het scherm bij de schakelaar én in de mail bijwerken
    let rotterdamTekst = "";

    if (naarRotterdam) {
        // Tekst naast de knop als hij AANGEVINKT is:
        if (rotterdamLabel) {
            rotterdamLabel.textContent = "Ik kom naar Rotterdam voor de foto's";
        }
        rotterdamTekst = "ik heb wel de mogelijkheid om naar Rotterdam te komen.";
    } else {
        // Tekst naast de knop als hij UITGEVINKT is:
        if (rotterdamLabel) {
            rotterdamLabel.textContent = "Ik kom niet naar Rotterdam en betaal de OV kosten die Roeland maakt";
        }
        rotterdamTekst = "ik heb niet de mogelijkheid om naar Rotterdam te komen. Ik ben mij ervan bewust dat ik de reiskosten voor het OV moet vergoeden.";
    }

    let bijzonderhedenTekst = bijzonderheden !== "" ? `\n\n${bijzonderheden}` : "";

    const bodyText =
        `Hi Roeland,

Hierbij wil ik graag een aanvraag doen voor ${pakket}, ${rotterdamTekst}${bijzonderhedenTekst}

Ik hoor graag van je.

Groetjes,
${voornaam || '[Je voornaam]'}`;

    return { voornaam, bodyText };
}

// 3. MAILTO LINK & PREVIEW BIJWERKEN
function updateMailtoLink() {
    const { voornaam, bodyText } = generateMailContent();

    if (mailPreview) {
        mailPreview.textContent = bodyText;
    }

    if (voornaam !== "") {
        mailtoBtn.classList.remove('uitgeschakeld');
        const mailtoUrl = `mailto:${ONTVANGER_EMAIL}?subject=${encodeURIComponent(EMAIL_ONDERWERP)}&body=${encodeURIComponent(bodyText)}`;
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
            copyTextBtn.textContent = "Gekopieerd!";
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
