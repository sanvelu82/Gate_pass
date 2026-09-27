/**
 * CSV parser utility — loads and parses Mock_participants.csv
 * into a hash-map for O(1) lookup by RegNo
 */

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function parseCSV(text) {
  const db = {};
  const lines = text.trim().split('\n');

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const fields = parseCSVLine(line);
    if (fields.length >= 6) {
      const regNo = fields[0].replace(/"/g, '').trim();
      db[regNo] = {
        regNo,
        name: fields[1].replace(/"/g, '').trim(),
        school: fields[2].replace(/"/g, '').trim(),
        grade: fields[3].replace(/"/g, '').trim(),
        dob: fields[4].replace(/"/g, '').trim(),
        photo: fields[5].replace(/"/g, '').trim(),
      };
    }
  }

  return db;
}

export async function loadStudentData() {
  const response = await fetch('/Mock_participants.csv');
  const text = await response.text();
  return parseCSV(text);
}
