#!/bin/bash
hlq=$1
set -e

echo "================Z/OS FILES CREATE DATA-SET-COBOL==============="
zowe zos-files create data-set-cobol "$1.test.data.set.cobol" $2
if [ $? -gt 0 ]
then
    exit $?
fi