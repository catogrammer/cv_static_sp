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

themeSwitcher.addEventListener('click', () => {
    if ( body.classList.contains('light') ) {
        body.classList.remove('light');
        body.classList.add('dark');

        cards.forEach(card => {
            card.classList.remove('light');
            card.classList.add('dark');
        })
    } else {
        body.classList.remove('dark');
        body.classList.add('light');

        cards.forEach(card => {
            card.classList.remove('dark');
            card.classList.add('light');
        })
    }
});
