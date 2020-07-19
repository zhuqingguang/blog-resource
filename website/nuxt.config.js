const path = require('path')
console.log(process.env.NODE_ENV);
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
    head: {
        __dangerouslyDisableSanitizers: ['script'],
        title: '资源收集站',
        meta: [
            { charset: 'utf-8' },
            { name: 'keywords', content: 'IT, 程序员，编程，编程工具，免费课程，软件，学习资源' },
            { name: 'description', content: '这是一个资源集合网址，收录了阮一峰老师的每周期刊中的工具，资源，课程和软件信息' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1' }
        ],
        script: [
            {
                innerHTML: process.env.NODE_ENV !== 'development' ? `
                    var _hmt = _hmt || [];
                    (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?abf89bf01510e02072a8b2241502b619";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                    })();
                ` : '',
                type: 'text/javascript',
                charset: 'utf-8'
            }
        ]
    },
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
    },
    plugins: [
        '~plugins/vue-lazyload',
    ],
}
