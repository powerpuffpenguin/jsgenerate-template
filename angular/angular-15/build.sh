#!/bin/bash
set -e
cd "$(dirname $BASH_SOURCE)"


copyThemes(){
    # copy themes
    themes_dir="src/assets/themes"
    if [[ -d "$themes_dir" ]];then
        rm "$themes_dir" -rf
        mkdir "$themes_dir" -p
    else
        mkdir "$themes_dir" -p
    fi
    themes=(
        bootstrap4-light-blue       bootstrap4-light-purple     bootstrap4-dark-blue    bootstrap4-dark-purple
        md-light-indigo     md-light-deeppurple     md-dark-indigo      md-dark-deeppurple
        mdc-light-indigo    mdc-light-deeppurple    mdc-dark-indigo     mdc-dark-deeppurple
        tailwind-light
        fluent-light
        lara-light-indigo   lara-dark-indigo    lara-light-purple   lara-dark-purple
        lara-light-blue     lara-dark-blue      lara-light-teal     lara-dark-teal
        saga-blue       saga-green      saga-orange     saga-purple
        vela-blue   vela-green    vela-orange     vela-purple
        arya-blue   arya-green      arya-orange     arya-purple
        nova    nova-alt    nova-accent
        luna-amber  luna-blue   luna-green  luna-pink
        rhea
    )
    for theme in ${themes[@]}
    do
        src="node_modules/primeng/resources/themes/$theme"
        if [[ -d "$src" ]]; then
                cp "$src" "$themes_dir/$theme" -r
        else
            echo "not found theme: '$theme' at '$src'"
            exit 1
        fi
    done
}
build(){
    copyThemes
    ng build
}
function help(){
    echo "build script"
    echo
    echo "Usage:"
    echo "  $0 [flags]"
    echo
    echo "Available Commands:"
    echo
    echo "Flags:"
    echo "  -h, --help          help for $0"
    echo "  -s, --serve         ng serve"
    echo "  -i, --i18n          generate i18n code and assets"
    echo "  -b, --build         ng build"
}

ARGS=`getopt -o hsib --long help,serve,i18n,build -n "$0" -- "$@"`
eval set -- "${ARGS}"
serve=0
i18n=0
build=0
while true; do
    case "$1" in
        -h|--help)
            help
            exit 0
        ;;
        -s|--serve)
            serve=1
            shift
        ;;
        -i|--i18n)
            i18n=1
            shift
        ;;
        -b|--build)
            build=1
            shift
        ;;
        --)
            shift
            break
        ;;
        *)
            echo Error: unknown flag "$1" for "$Command"
            echo "Run '$0 --help' for usage."
            exit 1
        ;;
    esac
done

if [[ $serve == 1 ]];then
    copyThemes
    ng serve --disable-host-check --host 0.0.0.0
    exit $?
fi

if [[ $i18n == 1 ]];then
    node i18n/i18n.js
    if [[ $build == 1 ]];then
        ng build
        exit 0
    fi
    exit 0
fi
if [[ $build == 1 ]];then
    ng build
    exit 0
fi

help
exit 1