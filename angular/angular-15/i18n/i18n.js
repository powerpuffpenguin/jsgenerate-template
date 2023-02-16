const core = require('./core')

core.generate(
    [
        'en',
        'zh-Hant',
        'zh-Hans',
    ],
    `${__dirname}/../src/internal/i18n.ts`,
    `${__dirname}/../src/assets/i18n`,
    {
        main: require('./keys/home'),
        themes: core.define(),
    },
)