#!/usr/bin/env node
const execSync = require('child_process').execSync;
const fs = require('fs');

let version;
try {
    const pkg = fs.readFileSync('package.json', {
        encoding: 'utf-8'
    });
    version = JSON.parse(pkg).version;
} catch (e) {
    console.error(`未找到package.json文件`);
    process.exit(1);
}

const tasks = [
    `git tag -a ${version} -m "v-${version}"`,
    `git push origin ${version}`
];

tasks.forEach((str) => {
    execSync(str);
    console.log(`任务【${str}】完成！`);
});

console.log('end');
