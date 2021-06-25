#!/usr/bin/env node
const execSync = require('child_process').execSync;
const fs = require('fs');

function runTask (str) {
    console.log(`任务【${str}】开始！`);
    execSync(str);
    console.log(`任务【${str}】完成！`);
}

function changeVersion() {
    if (process.argv.length === 3) { // [ '/usr/local/bin/node', '/usr/local/bin/jwtag', 'patch' ]
        const versionAction = process.argv[2];
        const actions = ['patch', 'minor', 'major'];
        if (!actions.includes(versionAction)) {
            console.error(`参数不对，必须是【${actions.join('、')}】其中之一`);
            process.exit(1);
        }
        runTask(`npm version ${versionAction}`);
    }
}

function tagAndPush () {
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

    tasks.forEach(runTask);
}

changeVersion();
tagAndPush();

console.log('end');
