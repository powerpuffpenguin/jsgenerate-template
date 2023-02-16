const fs = require('fs');
/**
 * 一個翻譯條目
 */
class I18N {
    id = undefined
    note = undefined
    constructor(opts) {
        this.id = opts?.id
        this.note = opts?.note
    }
}

/**
 * 創建翻譯條目
 * @param {Object} opts 
 * @param {undefined|string} opts.id 翻譯 id
 * @param {undefined|string} opts.note 給人類看的說明
 * @returns I18N
 */
function define(opts) {
    return new I18N(opts)
}
/**
 * 創建翻譯條目
 * @param {undefined|string} id 翻譯 id
 * @param {undefined|string} note 給人類看的說明
 * @returns I18N
 */
function i18n(id, note) {
    return new I18N({
        id: id,
        note: note,
    })
}

function generateKey(strs, obj, prefix, tab) {
    for (const o in obj) {
        if (!Object.hasOwnProperty.call(obj, o)) {
            continue
        } else if (o.startsWith("__")) {
            continue
        }

        const v = obj[o]
        if (v === null || v === undefined || v instanceof I18N) {
            let id = v?.id ?? o
            id = prefix == '' ? id : prefix + '.' + id
            const note = v?.note ?? ''
            if (note != '') {
                strs.push(`${tab}/**`)
                const vals = note.split("\n")
                for (const val of vals) {
                    strs.push(`${tab}* ${val}`)
                }
                strs.push(`${tab}*/`)
            }
            strs.push(`${tab}${o}: ${JSON.stringify(id)},`)
        } else if (typeof v === "object") {
            let id = v.__id ?? ''
            if (id == '') {
                id = o
            }
            strs.push(`${tab}${o}: {`)
            generateKey(strs, v, prefix == "" ? id : `${prefix}.${id}`, tab + "\t")
            strs.push(`${tab}},`)
        }
    }
}
function generateKeys(i18n) {
    const strs = []
    generateKey(strs, i18n, "", "\t")
    return "export const i18n = {\n" + strs.join("\n") + "\n}"
}
function copyI18n(i18n, dst, src) {
    for (const o in i18n) {
        if (!Object.hasOwnProperty.call(i18n, o)) {
            continue
        } else if (o.startsWith("__")) {
            continue
        }
        const v = i18n[o]
        if (v === null || v === undefined || v instanceof I18N) {
            const id = v?.id ?? o
            let val = null
            if (src && typeof src[id] === "string") {
                val = src[id]
            }
            dst[id] = val ?? null
        } else if (typeof v === "object") {
            let id = v.__id ?? ''
            if (id == '') {
                id = o
            }

            let s
            if (src) {
                s = src[id]
                if (typeof s !== "object") {
                    s = null
                }
            }
            dst[id] = copyI18n(v, {}, s)
        }
    }
    return dst
}
/**
 * 
 * @param {Array<string>} langs 要翻譯的語言數組
 * @param {string} keyname 翻譯條目 keys 代碼生成位置
 * @param {string} output 翻譯檔案輸出位置
 * @param {*} i18n 要翻譯的內容
 */
function generate(langs, keyname, output, i18n) {
    // 創建語言包
    for (const lang of langs) {
        let old
        const filename = `${output}/${lang}.json`
        try {
            old = JSON.parse(fs.readFileSync(filename, {
                encoding: "utf-8"
            }))
        } catch (e) {
            if (e.code !== 'ENOENT') {
                throw e
            }
            // not found
        }
        console.log(`${lang} to ${filename}`)
        fs.writeFileSync(filename, JSON.stringify(copyI18n(i18n, {}, old), "", "\t"), {
            flag: "w"
        })
    }

    fs.writeFileSync(keyname, generateKeys(i18n), {
        flag: "w"
    })
}
module.exports = {
    I18N: I18N,
    define: define,
    i18n: i18n,
    generate: generate,
}