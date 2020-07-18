const path = require('path') 
export default {
    target: 'static',
    // srcDir: 'website/',
    // modulesDir: [ '../node_modules' ],
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/tailwindcss',
    ],
    css: [
        '~assets/css/tailwind.css', 
    ],
    build: {
        postcss: {
          plugins: {
            'postcss-import': {},
            tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
            'postcss-nested': {}
          }
        },
        preset: {
          stage: 1 // see https://tailwindcss.com/docs/using-with-preprocessors#future-css-featuress
        }
    }
}
