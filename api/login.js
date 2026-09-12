import fs from 'node:fs';
import path from 'node:path';

const USERS_FILE = path.join(process.cwd(), 'api', '_private', 'fucktuzguard.txt');
const KEYS_FILE = path.join(process.cwd(), 'api', '_private', 'timofeebtuzguardebeal.txt');

function readLines(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Метод не поддерживается.' });
  try {
    const { username = '', password = '', key = '' } = req.body || {};
    const login = String(username).trim();
    const pass = String(password);
    const activationKey = String(key).trim();
    if (!login || !pass || !activationKey) return res.status(400).json({ success: false, error: 'Заполните все поля.' });

    const validUser = readLines(USERS_FILE).some(line => {
      const parts = line.split(/\s+/);
      return parts.length >= 2 && parts[0] === login && parts.slice(1).join(' ') === pass;
    });
    if (!validUser) return res.status(401).json({ success: false, error: 'Неверный логин или пароль.' });

    let expiry = null;
    for (const line of readLines(KEYS_FILE)) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2 && parts[0] === activationKey) {
        const parsed = new Date(parts.slice(1).join(' '));
        if (Number.isNaN(parsed.getTime())) return res.status(500).json({ success: false, error: 'У ключа указана некорректная дата.' });
        expiry = parsed.toISOString();
        break;
      }
    }
    if (!expiry) return res.status(401).json({ success: false, error: 'Неверный ключ активации.' });
    return res.status(200).json({ success: true, username: login, expiry });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Ошибка сервера.' });
  }
}
