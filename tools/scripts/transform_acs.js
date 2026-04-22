const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const filePath = path.join(PROJECT_ROOT, 'docs', 'releases', 'MVP_User_Stories.md');

let raw = fs.readFileSync(filePath, 'utf8');

// Detect and normalise line endings
const hasCRLF = raw.includes('\r\n');
raw = raw.replace(/\r\n/g, '\n');

const lines = raw.split('\n');
const out = [];
let i = 0;
let tableCount = 0;

while (i < lines.length) {
    if (lines[i] === '### Acceptance Criteria') {
        out.push(lines[i]); // keep the heading
        i++;

        // Collect all AC lines; skip blank lines; stop at next ### heading
        const acs = [];
        while (i < lines.length && !lines[i].startsWith('###')) {
            const trimmed = lines[i].trim();
            if (trimmed.match(/^\*\*AC\d+/)) {
                acs.push(trimmed);
            }
            i++;
        }

        if (acs.length === 0) continue; // nothing to convert

        // Determine if any ACs have a named scenario ("ACn — Name")
        const anyNamed = acs.some(ac => /^\*\*AC\d+\s*—/.test(ac));

        out.push('');
        if (anyNamed) {
            out.push('| **#** | **Scenario** | **Criterion** |');
            out.push('|---|---|---|');
        } else {
            out.push('| **#** | **Criterion** |');
            out.push('|---|---|');
        }

        for (const ac of acs) {
            // Pattern: **ACn — Scenario title** criterion text
            const m1 = ac.match(/^\*\*AC(\d+)\s*—\s*([^*]+)\*\*\s*([\s\S]*)/);
            // Pattern: **ACn** criterion text
            const m2 = ac.match(/^\*\*AC(\d+)\*\*\s*([\s\S]*)/);

            // Escape pipe chars in cell content to avoid breaking the table
            const esc = (s) => s.replace(/\|/g, '\\|').trim();

            if (m1) {
                const num   = m1[1];
                const title = esc(m1[2]);
                const crit  = esc(m1[3]);
                if (anyNamed) {
                    out.push(`| AC${num} | ${title} | ${crit} |`);
                } else {
                    // shouldn't happen when anyNamed is false, but be safe
                    out.push(`| AC${num} | ${title} — ${crit} |`);
                }
            } else if (m2) {
                const num  = m2[1];
                const crit = esc(m2[2]);
                if (anyNamed) {
                    out.push(`| AC${num} | — | ${crit} |`);
                } else {
                    out.push(`| AC${num} | ${crit} |`);
                }
            }
        }

        out.push('');
        tableCount++;
        // i is already pointing at the next ### line — do NOT increment
    } else {
        out.push(lines[i]);
        i++;
    }
}

let result = out.join('\n');
if (hasCRLF) result = result.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log(`Done. Converted ${tableCount} Acceptance Criteria sections to tables.`);
