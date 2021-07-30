#!/usr/bin/env node
const execSync = require('child_process').execSync;
const fs = require('fs');

function runTask(str) {
    console.log(`任务【${str}】开始！`);
    execSync(str);
    // console.log(str);
    console.log(`任务【${str}】完成！`);
}

let msg;

function changeVersion() {
    if (process.argv.length > 3) { // [ '/usr/local/bin/node', '/usr/local/bin/jwtag', 'patch' ]
        const versionAction = process.argv[2];
        const actions = ['patch', 'minor', 'major'];
        if (actions.includes(versionAction)) {
            msg = process.argv[3]
            runTask(`npm version ${versionAction}`);
        } else {
            msg = versionAction;
        }
    }
}

function tagAndPush() {
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

    if (!msg) {
        msg = `"v-${version}"`;
    }

    const tasks = [
        `git tag -a ${version} -m ${msg}`,
        `git push origin ${version}`
    ];

    tasks.forEach(runTask);
}

changeVersion();
tagAndPush();

console.log('end');
