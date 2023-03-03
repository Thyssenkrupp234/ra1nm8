const btn = document.querySelector("button") as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () => {
    btn.onclick = () => {
        btn.textContent = "jailbreaking";
    };
});