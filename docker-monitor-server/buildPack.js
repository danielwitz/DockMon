var exec = require('child_process').exec;
var os = require('os');
var FILES_TO_ZIP = 'node_modules build Dockerfile ssl views public';

function zipBuildedProject() {
    var cmd ='';
    if (os.type() === 'Windows_NT') {
        cmd = ' winrar.exe a -afzip build.zip ' + FILES_TO_ZIP;
    } else {
        cmd = 'zip -r -q build.zip ' + FILES_TO_ZIP;
    }
    exec(cmd, function (error, stduot, stderr) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('stdout: ' + stduot);
    });
}

zipBuildedProject();