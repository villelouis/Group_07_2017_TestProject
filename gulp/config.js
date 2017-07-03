module.exports = {
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },

    // JS config
    js: {
        add: ['./src/scripts/dev/libs/jquery-2.1.3.min.js'],
        src: ['./src/scripts/dev/modules/*.js'],
        dest: './src/scripts',
        concat: "bundle.js"
    },

    // LESS config
    less: {
        src: './src/styles/*.less',
        dest: './src/styles'
    },

    // Icons config
    icons: {
        src: './src/images/icons/*',
        dest: './src/styles/common',
        template: './gulp/icons-template',
        concat: 'icons.less'
    },

    // Browser Sync config
    bsync: {
        base: './',
        start: './src/markup/'
    },

    // Watch config
    watch: {
        html: 'src/markup/**/*.html',
        less: 'src/styles/**/*.less',
        icons: 'src/images/icons/*',
        js: 'src/scripts/dev/modules/*.js'
    },

    // Plugins config
    plugins: {
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        rename: {
            'gulp-sourcemaps': 'sourcemaps',
            'gulp-plumber': 'plumber',
            'gulp-less': 'less',
            'gulp-image-data-uri': 'uri',
            'gulp-concat': 'concat',
            'gulp-ignore': 'ignore',
            'gulp-babel': 'babel',
            'gulp-add-src': 'add'
        }
    }
};