import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const plik = req.query.plik;

  if (!plik) {
    return res.status(400).json({ error: 'Missing plik param' });
  }

  const filePath = path.join(process.cwd(), 'data', plik);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return res.status(200).json({ tresc: content });
  } catch (err) {
    return res.status(500).json({ error: 'Read failed', details: err.message });
  }
}
