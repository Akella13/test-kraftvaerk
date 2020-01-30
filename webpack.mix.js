let mix = require('laravel-mix');
mix.js('src/js/app.js', 'public/js/script.js')
    .sass('src/scss/app.scss', 'public/css/style.css');