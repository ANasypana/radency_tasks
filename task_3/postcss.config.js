module.exports = {
    plugins: [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                    grid: 'autoplace',
                },
                stage: 3,
                features: {
                    'custom-properties': false,
                    'nesting-rules': true,
                },
            },
        ],
        [
            '@fullhuman/postcss-purgecss',
            {
                content: [
                    './**/*.{js,jsx,ts,tsx}',
                ],
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: ['html', 'body'],
            },
        ],
    ],
};
