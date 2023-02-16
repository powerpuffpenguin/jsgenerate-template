const core = require('../core');
const i18n = core.i18n;
const define = core.define;
module.exports = {
    // 爲這個組指定 id
    __id: "h",
    home: i18n('h', 'Home Page'),
    language: i18n('l'),
    about: define({
        id: 'ab',
        note: 'About Page',
    }),
    // 創建一個子組
    notfound: {
        tooltip: define(),
        page: i18n(),
    },
}
