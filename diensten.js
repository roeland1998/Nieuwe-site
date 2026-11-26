// Instellingen
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCoPmfZJtuP_Irf_28QuM58CSr3ebITjuDB7gxdtfX6kWroiG7TZnyNUam0oYq093B/exec";

// Elementen ophalen uit de HTML
const closeModalBtn = document.getElementById('closeModalBtn');
const emailModal = document.getElementById('emailModal');
const emailForm = document.getElementById('emailForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

const voornaamInput = document.getElementById('voornaam');
const emailInput = document.getElementById('email');
const pakketSelect = document.getElementById('pakket');
const rotterdamCheckbox = document.getElementById('rotterdam');
const rotterdamLabel = document.querySelector('label[for="rotterdam"]');
const bijzonderhedenInput = document.getElementById('bijzonderheden');
const honeypotInput = document.getElementById('website_url');

// 1. POP-UP OPENEN EN SLUITEN LOGICA (Event Delegation)
document.addEventListener('click', (e) => {
    const button = e.target.closest('.pakket-btn');

    if (button) {
        e.preventDefault();
        const gekozenPakket = button.getAttribute('data-pakket');

        if (gekozenPakket && pakketSelect) {
            pakketSelect.value = gekozenPakket;
        }

        // Reset eventuele eerdere statusmelding bij opnieuw openen
        if (formStatus) {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Verstuur aanvraag";
        }

        updateRotterdamLabel();
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

// 2. ROTTERDAM LABEL BIJWERKEN OP BASIS VAN TAAL & CHECKBOX
function updateRotterdamLabel() {
    const lang = document.documentElement.lang || 'nl';
    const translationsObj = (typeof translations !== 'undefined') ? translations : {};
    const t = translationsObj[lang] || translationsObj['nl'] || {};

    const rotterdam_label_ja = t.rotterdam_label_ja || "Mogelijkheid om naar Rotterdam te komen";
    const rotterdam_label_nee = t.rotterdam_label_nee || "Kan niet naar Rotterdam komen";

    if (rotterdamLabel && rotterdamCheckbox) {
        rotterdamLabel.textContent = rotterdamCheckbox.checked ? rotterdam_label_ja : rotterdam_label_nee;
    }
}

if (rotterdamCheckbox) {
    rotterdamCheckbox.addEventListener('change', updateRotterdamLabel);
}

// 3. FORMULIER VERSTUREN NAAR GOOGLE APPS SCRIPT
if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const voornaam = voornaamInput ? voornaamInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const pakket = pakketSelect ? pakketSelect.value : "";
        const rotterdam = rotterdamCheckbox ? rotterdamCheckbox.checked : false;
        const bijzonderheden = bijzonderhedenInput ? bijzonderhedenInput.value.trim() : "";
        const honeypot = honeypotInput ? honeypotInput.value.trim() : "";

        if (!voornaam || !email) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Bezig met versturen...";
        }
        if (formStatus) {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        }

        const payload = {
            voornaam,
            email,
            pakket,
            rotterdam,
            bijzonderheden,
            honeypot
        };

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(payload)
            });

            emailForm.reset();
            updateRotterdamLabel();

            if (submitBtn) {
                submitBtn.textContent = "Verstuurd!";
            }
            if (formStatus) {
                formStatus.textContent = "Bedankt! Je aanvraag is verstuurd. Ik neem snel contact met je op.";
                formStatus.classList.add("succes");
            }
        } catch (error) {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Verstuur aanvraag";
            }
            if (formStatus) {
                formStatus.textContent = "Er ging iets mis bij het versturen. Probeer het opnieuw of mail direct naar info@roelandlenoir.com.";
                formStatus.classList.add("fout");
            }
        }
    });
}

// Direct initialiseren
updateRotterdamLabel();
