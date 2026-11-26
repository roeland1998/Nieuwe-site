const CONTACT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzd3kuo1IE_4Oqv38bTI3zKzW9ZjHJ3C6CCNA89f5MEQOUGIADg0AFrMh2_nbVlSRb_CQ/exec";

const contactForm = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const contactFormStatus = document.getElementById("contactFormStatus");

const naamInput = document.getElementById("naam");
const contactEmailInput = document.getElementById("email");
const berichtInput = document.getElementById("bericht");
const contactHoneypotInput = document.getElementById("website_url");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const naam = naamInput ? naamInput.value.trim() : "";
        const email = contactEmailInput ? contactEmailInput.value.trim() : "";
        const bericht = berichtInput ? berichtInput.value.trim() : "";
        const honeypot = contactHoneypotInput ? contactHoneypotInput.value.trim() : "";

        if (!naam || !email) return;

        if (contactSubmitBtn) {
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.textContent = "Bezig met versturen...";
        }
        if (contactFormStatus) {
            contactFormStatus.textContent = "";
            contactFormStatus.className = "form-status";
        }

        const payload = {
            naam,
            email,
            bericht,
            honeypot
        };

        try {
            await fetch(CONTACT_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(payload)
            });

            contactForm.reset();

            if (contactSubmitBtn) {
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.textContent = "Verstuur bericht";
            }
            if (contactFormStatus) {
                contactFormStatus.textContent = "Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.";
                contactFormStatus.classList.add("succes");
            }
        } catch (error) {
            if (contactSubmitBtn) {
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.textContent = "Verstuur bericht";
            }
            if (contactFormStatus) {
                contactFormStatus.textContent = "Er ging iets mis bij het versturen. Probeer het opnieuw of mail direct naar info@roelandlenoir.com.";
                contactFormStatus.classList.add("fout");
            }
        }
    });
}
