const { Translate, executeCommand } = require('@king011/ngx-translate-id');
// Define translation details
const translate = new Translate({
    // Set the list of languages to translate
    languages: [
        'en',
        'zh-Hant',
        'zh-Hans',
    ],
    // Set translation entry
    root: require('./keys/root'),
})
// Execute commands
executeCommand({
    translate: translate,
    // Generated code paths for angular
    code: `${__dirname}/../src/internal/i18n.ts`,
    // Output to this folder for translators to translate
    // Include instructions in comments and try to be human-friendly and readable
    output: `${__dirname}/assets`,
    // Angular's final packaged resource path
    // Removed instructions and created json with minimal size
    dist: `${__dirname}/../src/assets/i18n`,
})