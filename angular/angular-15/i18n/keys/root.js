const { group, i18n } = require('@king011/ngx-translate-id');
module.exports = {
    general: group(
        'g',
        '這裏包含一些比較通用的常規內容', {
        title: i18n('t', '這是項目的主標題，將作爲默認標題顯示在瀏覽器的標題欄上'),
        home: i18n('hp', `到主頁面的導航提示文本
            Home Page
            主頁`),
        about: i18n('ap', `到關於頁面的導航提示文本
            About Page
            關於`),
        themes: i18n('ts', `主題選擇的按鈕文本
            Themes
            主題`),
        languages: i18n('ls', `語言選擇按鈕文本
            Languages
            語言`),
        notfound: i18n('npf', `404頁面提示信息
            Not Found: {{url}}
            頁面未找到: {{url}}`),
        signin: i18n('in', `登入按鈕 文本提示
            sign in
            登入`),
        signout: i18n('out', `登出按鈕 文本提示
            sign out
            登出`),
        submit: i18n('st', `提交按鈕文本
            submit
            提交`),
    }),
    about: group(
        'ab',
        '關於頁面', {
        title: i18n('t', `標題
            About
            關於`),
        content: i18n('c', `關於頁面顯示的文本內容`),
    }),
}
