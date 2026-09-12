const VW_AUTH_KEY='voidware_user';
function saveVoidWareUser(username,expiry){const data={username:String(username),expiry:new Date(expiry).toISOString(),issuedAt:new Date().toISOString(),sessionId=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2)};localStorage.setItem(VW_AUTH_KEY,JSON.stringify(data));return data}
function getVoidWareUser(){try{const d=JSON.parse(localStorage.getItem(VW_AUTH_KEY)||'null');if(!d||!d.username||!d.expiry)return null;if(Number.isNaN(new Date(d.expiry).getTime()))return null;return d}catch{return null}}
function logoutVoidWare(){localStorage.removeItem(VW_AUTH_KEY);location.replace('login.html')}
async function loadVoidWareLines(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error('Не удалось загрузить данные авторизации.');return (await r.text()).split(/\r?\n/).map(x=>x.trim()).filter(Boolean)}
