let mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js/script.js');
mix.sass('src/scss/app.scss', 'public/css/style.css');
mix.copy('src/img/', 'public/images/');
mix.copy('src/fonts/', 'public/fonts/');

mix.browserSync({
    proxy: false,
    server: true,
    watch: true,
    open: false,
});

mix.disableNotifications();
