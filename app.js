function applyTheme(){document.body.classList.toggle("dark",localStorage.vwTheme==="dark")}
applyTheme();
document.documentElement.style.colorScheme=localStorage.vwTheme==="dark"?"dark":"light";
document.getElementById("themeToggle")?.addEventListener("click",()=>{localStorage.vwTheme=document.body.classList.contains("dark")?"light":"dark";applyTheme();document.documentElement.style.colorScheme=localStorage.vwTheme==="dark"?"dark":"light"});
document.getElementById("showPass")?.addEventListener("click",e=>{const i=document.getElementById("loginPass");if(!i)return;i.type=i.type==="password"?"text":"password";e.currentTarget.textContent=i.type==="password"?"Показать":"Скрыть"});
document.getElementById("loginForm")?.addEventListener("submit",e=>{e.preventDefault();const n=document.getElementById("loginNote");if(n)n.textContent="Демо-вход: данные не отправляются на сервер."});
document.querySelectorAll(".faq-q").forEach(b=>b.addEventListener("click",()=>b.parentElement.classList.toggle("open")));
document.querySelectorAll(".download-btn").forEach(b=>b.addEventListener("click",()=>alert("Демо-загрузка VoidWare "+b.dataset.version)));
