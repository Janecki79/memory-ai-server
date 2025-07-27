import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { plik, tresc } = req.body;

  if (!plik || !tresc) {
    return res.status(400).json({ error: 'Missing plik or tresc' });
  }

  const filePath = path.join(process.cwd(), 'data', plik);

  try {
    fs.writeFileSync(filePath, tresc, 'utf-8');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Write failed', details: err.message });
  }
}
