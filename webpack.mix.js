let mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js/script.js');

mix.sass('src/scss/app.scss', 'public/css/style.css');

mix.browserSync({
    proxy: false,
    server: true,
    watch: true,
});

mix.disableNotifications();
