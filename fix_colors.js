const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-slate-950': 'bg-background',
  'bg-slate-900': 'bg-surface',
  'bg-slate-800': 'bg-surface-hover',
  'bg-slate-700': 'bg-surface-hover',
  'text-slate-100': 'text-foreground',
  'text-slate-200': 'text-foreground',
  'text-slate-300': 'text-foreground-secondary',
  'text-slate-400': 'text-foreground-muted',
  'text-slate-500': 'text-foreground-muted',
  'border-slate-800': 'border-border',
  'border-slate-700': 'border-border-light',
  'text-cyan-400': 'text-accent',
  'text-purple-400': 'text-primary',
  'from-slate-900': 'from-surface',
  'to-slate-950': 'to-background',
  'from-purple-500/20': 'from-primary/20',
  'to-cyan-500/20': 'to-accent/20',
  'from-purple-600': 'from-primary',
  'to-cyan-600': 'to-accent',
  'via-purple-500': 'via-primary',
  'to-pink-500': 'to-accent',
  'bg-slate-950/95': 'bg-background/95',
  'bg-slate-900/50': 'bg-surface/50'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const [oldClass, newClass] of Object.entries(replacements)) {
        newContent = newContent.replace(new RegExp(oldClass.replace(/\//g, '\\\\/'), 'g'), newClass);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated', fullPath);
      }
    }
  }
}

processDirectory('./app');
processDirectory('./components');
