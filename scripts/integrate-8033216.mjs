import fs from 'node:fs';

const target = new URL('../src/data/mathMockQuestions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
const rows = [
  [11,"Diagrammada 2-korxonaning aprel oyidagi va 3-korxonaning mart oyidagi ishlab chiqarishlari yig'indisini toping.",['80','82','84','78'],0,'Diagramma','44+36=80.'],
  [12,'1 m balandlikdagi, jami 5 litr sig‘imli silindrsimon idishda 2,5 litr suv sathi qanday balandlikda bo‘ladi?',['0,65','0,5','0,6','0,4'],1,'Proporsiya','Hajmning yarmi balandlikning yarmiga, ya’ni 0,5 m ga teng.'],
  [13,'Katakli chizmadagi α va β burchaklar uchun qaysi tenglik o‘rinli?',['α+β=90°','2α+β=90°','2α+β=180°','α+2β=90°'],1,'Burchaklar','Qiya yo‘nalishlardan 2α+β=90°.'],
  [14,'Tomoni 4 katak bo‘lgan kvadratdagi bo‘yalgan uchburchak yuzini toping (har katak eni 1 cm).',['6','8','16','4'],3,'Geometriya','Uchburchak asosi 4, unga balandlik 2; S=4·2/2=4.'],
  [15,'36 uzunlikdagi kesmani 2:3:4 nisbatda bo‘ling.',['10; 12; 14','8; 12; 16','6; 10; 20','6; 14; 16'],1,'Nisbat','36/(2+3+4)=4; qismlar 8,12,16.'],
  [16,'Qaysi tenglik to‘g‘ri?',['40=6·5+6','40=6·5+9','40=7·5+6','40=8·4+8'],3,'Arifmetika','8·4+8=40.'],
  [17,"Qirralari a,b,c bo'lgan to'g'ri burchakli parallelepiped to‘la sirt yuzi formulasini tanlang.",['ab+bc+ac','6a²','2(ab+ac+bc)','abc'],2,'Stereometriya','Qarama-qarshi yoqlar juft bo‘lgani uchun 2(ab+ac+bc).'],
  [18,'(3ab)³:(-ab)² ni soddalashtiring.',['27ab','-9ab','9a⁵b⁵','-27a⁵b⁵'],0,'Darajalar','27a³b³/(a²b²)=27ab.'],
  [19,'17/(5x)=2-7/x tenglamani yeching.',['5,4','-5,2','5,2','-5'],2,'Tenglama','17=10x-35; x=5,2.'],
  [20,"Tog' cho'qqisiga 5 ta yo'l bor. Yo‘llardan bittasini necha usulda tanlash mumkin?",['4','1','2','5'],3,'Kombinatorika','5 yo‘ldan bittasi 5 usulda tanlanadi.'],
];
const ids = new Set(data.map(({ id }) => id));
for (const [n, question, options, correctOption, topic, explanation] of rows) {
  const item = {
    id: `MATH-8033216-MAJ-${n}`, examId: '8033216-MAJ',
    examLabel: 'Variant 8033216 - Majburiy matematika', variantId: '8033216',
    sourceQuestionNumber: n, question, options, correctOption, subject: 'Matematika',
    year: 2025, topic, isSourceError: false, validationStatus: 'verified', explanation,
  };
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  data.push(item);
}
fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Added ${rows.length}; total ${data.length}.`);
