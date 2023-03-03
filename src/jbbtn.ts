const { exec } = require('child_process');
const btn = document.querySelector("button") as HTMLButtonElement;
const path = require("path");

document.addEventListener('DOMContentLoaded', () => {
    btn.onclick = () => {
        btn.textContent = "jailbreaking";
        btn.disabled = true;
        btn.style.backgroundColor = "#FFC300";
        exec(path.join(__dirname,"/resources/exploit/switcharoo"+" /etc/pam.d/su "+path.join(__dirname,"/resources/exploit/overwrite_file.bin")), (error: any, stdout: any, stderr: any) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            btn.style.backgroundColor = "#32e000";
          });
    };
});