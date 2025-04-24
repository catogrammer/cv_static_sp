import './styles.scss'

window.onbeforeprint = function() { 
    console.log("before print");
};

window.onafterprint = function() { 
    console.log("after print");
};

// theme button
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const cards = document.querySelectorAll('[class^="card "]');
const highlightSubstrate = document.querySelectorAll('[class^="substrate"]');
const imgSub = document.querySelectorAll('[class^="img-contrainer "]');

function updateThemeClass(theme_class, old_theme_class) {
    body.classList.remove(old_theme_class);
    body.classList.add(theme_class);

    imgSub.forEach(img => {
        img.classList.remove(old_theme_class);
        img.classList.add(theme_class);
    })

    cards.forEach(card => {
        card.classList.remove(old_theme_class);
        card.classList.add(theme_class);
    })

    highlightSubstrate.forEach( sub => {
        sub.classList.remove(old_theme_class);
        sub.classList.add(theme_class);
    })
};

function toggleTheme() {
    const theme_class = body.classList.contains('dark') ? 'light' : 'dark';
    const old_theme_class = !body.classList.contains('dark') ? 'light' : 'dark';

    updateThemeClass(theme_class, old_theme_class);
    localStorage.setItem('theme', theme_class);
};


// Check if a theme preference is stored in localStorage
const storedTheme = localStorage.getItem('theme');
if ( storedTheme === 'dark' ) {
    themeSwitcher.checked = false;
    updateThemeClass('dark', 'light')
} else {
    themeSwitcher.checked = true;
    updateThemeClass('light', 'dark')
}

themeSwitcher.addEventListener('change', toggleTheme);
