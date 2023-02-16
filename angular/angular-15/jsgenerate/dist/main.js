"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsgenerate = exports.description = exports.tag = void 0;
const fs_1 = require("fs");
const helper_1 = require("./helper");
const path_1 = require("path");
exports.tag = 'default init-trunc init-supplement';
exports.description = 'angular template';
async function exists(filename) {
    try {
        await fs_1.promises.access(filename, fs_1.constants.F_OK);
        return true;
    }
    catch (e) {
    }
    return false;
}
class Metadata {
    constructor(pkg, name, tag, uuid, aesKey, aesIV) {
        this.uuid = uuid;
        this.aesKey = aesKey;
        this.aesIV = aesIV;
        this.date = new Date();
        this.project_ = '';
        this.pkg_ = '';
        this.year = new Date().getFullYear();
        this.initTrunc = false;
        this.initSupplement = false;
        // pkg = pkg.replace('.', '/').replace('@', '').replace('-', '_')
        pkg = pkg.replace('@', '').replace('-', '_');
        pkg = pkg.replace('//', '/').replace('__', '_');
        this.pkg_ = pkg;
        name = name.replace('.', '').replace('@', '').replace('-', '_').replace('/', '');
        name = name.replace('__', '_');
        this.project_ = name;
        if (Array.isArray(tag)) {
            for (let i = 0; i < tag.length; i++) {
                const v = tag[i];
                if (v == 'init-trunc') {
                    this.initTrunc = true;
                }
                else if (v == 'init-supplement') {
                    this.initSupplement = true;
                }
            }
        }
    }
    get project() {
        return this.project_;
    }
    get pkg() {
        return this.pkg_;
    }
}
async function getUUID(context) {
    try {
        const dir = await fs_1.promises.opendir((0, path_1.join)(context.output, 'pb'));
        for await (const dirent of dir) {
            if (!dirent.isDirectory()) {
                continue;
            }
            const name = dirent.name;
            if (name.length == 36 && /[a-z0-9]{8}\-([a-z0-9]{4}\-){3}[a-z0-9]{12}/.test(name)) {
                return name;
            }
        }
    }
    catch (e) {
    }
    return context.uuidv1();
}
function jsgenerate(context) {
    getUUID(context).then((uuid) => {
        const md = new Metadata(context.pkg, context.name, context.tag, uuid, context.uuidv4(), context.uuidv4());
        const prefix = [
            '.git' + path_1.sep,
        ];
        const exclude = ['.git', 'document'];
        const nameService = new helper_1.NameService(context.output, uuid, new helper_1.Exclude(prefix, [], exclude)).rename(`${md.project}.jsonnet`, `example.jsonnet`, `bin`, `etc`);
        const skip = new Set();
        // .add(join(__dirname, '..', '..', 'README.md'))
        // .add(join(__dirname, '..', '..', 'README_ZH.md'))
        // .add(join(__dirname, '..', '..', 'LICENSE'))
        // .add(join(__dirname, '..', '..', '.gitignore'))
        context.serve(async function (name, src, stat) {
            if (skip.has(src) || nameService.checkExclude(name)) {
                return;
            }
            const filename = nameService.getOutput(name);
            if (await exists(filename)) {
                if (md.initSupplement) {
                    return;
                }
                if (!md.initTrunc) {
                    throw new Error(`file already exists : ${filename}`);
                }
            }
            if (nameService.isTemplate(name)) {
                const text = context.template(src, md);
                console.log('renderTo', filename);
                context.writeFile(filename, text, stat.mode);
            }
            else {
                console.log('copyTo', filename);
                await context.copyFile(filename, src, stat.mode);
            }
        }, async function (name, _, stat) {
            if (nameService.checkExclude(name)) {
                return;
            }
            const filename = nameService.getOutput(name);
            if (await exists(filename)) {
                if (md.initSupplement) {
                    return;
                }
                if (!md.initTrunc) {
                    throw new Error(`directory already exists : ${filename}`);
                }
            }
            console.log('mkdir', filename);
            await context.mkdir(filename, true, stat.mode);
        }).then(() => {
            console.log(`jsgenerate success`);
            console.log(`package : ${md.pkg}`);
            console.log(`project : ${md.project}`);
            console.log(`uuid : ${uuid}`);
        });
    });
}
exports.jsgenerate = jsgenerate;
