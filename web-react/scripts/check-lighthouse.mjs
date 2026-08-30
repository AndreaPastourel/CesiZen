
import { readFile } from 'node:fs/promises';

const reportPath = new URL(
  '../lighthouse-report.report.json',
  import.meta.url,
);

const reportContent = await readFile(reportPath, 'utf8');
const report = JSON.parse(reportContent);


const thresholds = [
  {
    key: 'performance',
    label: 'Performance',
    minimum: 0.5,
  },
  {
    key: 'accessibility',
    label: 'Accessibilité',
    minimum: 0.7,
  },
  {
   
    key: 'best-practices',
    label: 'Bonnes pratiques',
    minimum: 0.7,
  },
  {
   
    key: 'seo',
    label: 'SEO',
    minimum: 0.7,
  },
];


let hasFailure = false;


for (const threshold of thresholds) {
  const category = report.categories?.[threshold.key];
  if (!category || typeof category.score !== 'number') {
    console.error(`❌ ${threshold.label} : score introuvable.`);
    hasFailure = true;
    continue;
  }

  const score = Math.round(category.score * 100);
  const minimum = Math.round(threshold.minimum * 100);

  const isSuccessful = category.score >= threshold.minimum;

  const icon = isSuccessful ? '✅' : '❌';

  console.log(
    `${icon} ${threshold.label} : ${score} % — minimum attendu : ${minimum} %`,
  );


  if (!isSuccessful) {
    hasFailure = true;
  }
}


if (hasFailure) {
  
  console.error('❌ Certains seuils Lighthouse ne sont pas respectés.');
  process.exitCode = 1;
} else {

  console.log('✅ Tous les seuils Lighthouse sont respectés.');
}