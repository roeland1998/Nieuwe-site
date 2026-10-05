const translations = {
    en: {
        // Navigatie
        nav_diensten: "services",
        nav_overmij: "about me",
        nav_contact: "contact or hire me",
        nav_contact_mob: "contact or hire me",

        // Homepage
        home_titel: "Rotterdam-based photographer & storyteller.",
        home_intro: "Hi, my name is Roeland. I graduated as a photographer from the Utecht Academy of the Arts in 2020, and when people describe my style, they always mention a distinct atmosphere. I hope you enjoy my warm and curious view of the world around me, and who knows, maybe we might be able to work together in the near future. Feel free to get in touch if you have any questions.",
        home_knop: "discover more",

        // Filters Home
        home_filter_alles: "all photography",
        home_filter_portret: "portraits",
        home_filter_product: "products",
        home_filter_stilleven_sfeer: "still life and art",

        // Diensten - Hero
        hero_title: "Get a professional portrait photo with character and atmosphere.",
        hero_text: "How wonderful that you're enthusiastic about my work and are considering my services! To help everyone as best as possible, I've created different packages for you to choose from. See what suits you best and send a request. Don't see what you're looking for? Send an email to info@roelandlenoir.com to see if I can help you out. Hope to see you soon!",

        // Algemene knoppen & labels
        btn_want_this: "This is for me!",
        lbl_included: "Included:",
        lbl_optional: "Optional:",
        opt_extra_photos: "Additional edited photos: €10 per photo",

        // Pakket 1
        pkg1_title: "At your best",
        pkg1_inc1: "4 edited photos of your choice",
        pkg1_inc2: "We photograph you in 1 outfit",
        pkg1_inc3: "+/- 30 minutes",

        // Pakket 2
        pkg2_title: "At your best+",
        pkg2_inc1: "8 edited photos of your choice",
        pkg2_inc2: "We photograph you in 2 outfits",
        pkg2_inc3: "Room for experimentation and artistic portraits.",
        pkg2_inc4: "+/- 50 minutes",

        // Pakket 3
        pkg3_title: "Both at your best",
        pkg3_price: "€??",
        pkg3_desc: "If you and one or more friends all want new photos, you can book a session together where I photograph each of you separately. Group pricing is flexible and available on request.",
        pkg3_inc1: "4 or more edited photos of your choice each",
        pkg3_inc2: "Number of outfits, in consultation",
        pkg3_inc3: "Time: as long as needed",

        // Pop-up formulier
        modal_title: "Send request",
        modal_subtitle: "Fill in your details to compose the email.",
        label_voornaam: "First name *",
        label_pakket: "Choose a package *",
        option_pakket1: "At your best (€80)",
        option_pakket2: "At your best+ (€150)",
        option_pakket3: "Both at your best (price on request)",
        label_bijzonderheden: "Additional notes / message (optional)",
        preview_title: "Email message preview:",
        copy_btn: "Copy text & send email yourself",
        send_btn: "Send email",
        notice_label: "Please note!",
        notice_text: "If the button above does not work for you, copy the text using the 'copy text' button above and send the email yourself to ",

        // Mail Generator
        mail_onderwerp: "Request portrait shoot",
        rotterdam_label_ja: "I will come to Rotterdam for the photos",
        rotterdam_label_nee: "I cannot come to Rotterdam and will cover Roeland's public transportation costs",
        rotterdam_tekst_ja: "I am able to come to Rotterdam for the shoot.",
        rotterdam_tekst_nee: "I am not able to come to Rotterdam. I am aware that I will need to cover the public transport travel expenses.",
        mail_aanhef: "Hi Roeland,",
        mail_body_start: "I would like to request a shoot for",
        mail_afsluiting: "Looking forward to hearing from you.\n\nBest regards,\n",
        mail_geen_naam: "[Your first name]",

        // Placeholders
        placeholder_voornaam: "Type your first name...",
        placeholder_bijzonderheden: "Type any questions or remarks here...",

        // Over mij
        about_title: "About me",
        about_p1: "Hi, my name is Roeland. A 28-year-old photographer living in the city center of Rotterdam. Friends and family describe me as \"super creative and social\". I combine these sides of myself in my work as a photographer. During photo shoots, I do everything I can to create a pleasant and comfortable atmosphere. I listen to your wishes, help to make your vision come to life, and together we will make sure it is a comfortable session.",
        about_p2: "I completely understand that being photographed by someone you don't know can feel quite vulnerable. As a photographer myself, I am much more comfortable behind the camera rather than in front of it. But together we'll make sure it is a relaxed experience for all involved. If you have any questions at all or would like to know more about me, I strongly encourage you to reach out. You can send me an email or a message on WhatsApp.",
        about_button: "Get in touch",

        // Contact
        contact_title: "Get in touch with me / hire me",
        contact_text: "Would you like to collaborate? Discuss options? Know my shoe size? Chat about anything and everything? Feel free to get in touch using the links below. Send me a message or email, and of course, give me a follow on social media.",
        contact_email_label: "Email: ",

        // Footer
        footer_statement: "© 2026 Roeland Lenoir. All rights reserved. Everything on this website was created by me. Do not copy, share, or reuse any content, images, or text without asking my permission first.",
        footer_privacy: "Privacy statement"
    }
};

// Opslag voor originele Nederlandse HTML-teksten & placeholders
const originalTexts = {};
const originalPlaceholders = {};

function cacheOriginalTexts() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (!originalTexts[key]) {
            originalTexts[key] = element.textContent;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (!originalPlaceholders[key]) {
            originalPlaceholders[key] = element.placeholder;
        }
    });
}

function setLanguage(lang) {
    // 1. Teksten vertalen of terugzetten
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (lang === 'en' && translations.en[key]) {
            element.textContent = translations.en[key];
        } else if (originalTexts[key]) {
            element.textContent = originalTexts[key];
        }
    });

    // 2. Placeholders vertalen of terugzetten
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (lang === 'en' && translations.en[key]) {
            element.placeholder = translations.en[key];
        } else if (originalPlaceholders[key]) {
            element.placeholder = originalPlaceholders[key];
        }
    });

    document.documentElement.lang = lang;

    // 3. Mail-preview bijwerken (indien van toepassing)
    if (typeof updateMailtoLink === 'function') {
        updateMailtoLink();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Sla de originele Nederlandse teksten direct op bij het laden
    cacheOriginalTexts();

    const toggles = document.querySelectorAll('.taal-toggle');
    const savedLang = localStorage.getItem('site_taal') || 'nl';

    const isEnglish = savedLang === 'en';
    toggles.forEach(toggle => {
        toggle.checked = isEnglish;
    });

    // Voer de vertaling uit
    setLanguage(savedLang);

    // Luister naar veranderingen op de toggle
    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const selectedLang = e.target.checked ? 'en' : 'nl';

            toggles.forEach(t => t.checked = e.target.checked);

            setLanguage(selectedLang);
            localStorage.setItem('site_taal', selectedLang);
        });
    });
});