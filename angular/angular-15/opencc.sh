#!/bin/bash

cd $(dirname $BASH_SOURCE)
opencc -i "i18n/assets/zh-Hant.yaml" -o "i18n/assets/zh-Hans.yaml" -c t2s.json