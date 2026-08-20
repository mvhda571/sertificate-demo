import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const rows=[
[11,'9786 sonining raqamlari o‘rnini almashtirib eng kichik sonni hosil qiling.',['6789','6897','6879','6987'],1,'Sonlar','Nol bo‘lmagan raqamlar o‘sish tartibida: 6879.'],
[12,'32 soni 160 sonining qanday qismini tashkil qiladi?',['2/5','1/2','1/5','1/4'],2,'Kasrlar','32/160=1/5.'],
[13,'38 santimetr necha millimetrga teng?',['3800000','38000','3800','380'],3,"O'lchov birliklari",'38·10=380 mm.'],
[14,'Kub qirrasi 9 dm bo‘lsa, to‘la sirt yuzini toping.',['294','486','600','384'],1,'Stereometriya','6·9²=486.'],
[15,'Ombor yuzi 3:5 nisbatda bo‘lingan. Umumiy yuzi 120 m² bo‘lsa, kichik xona yuzini toping.',['65','80','75','45'],3,'Nisbat','120·3/8=45.'],
[16,'Tomonlari 8, 7 va 6 bo‘lgan uchburchak perimetrini toping.',['21','22','20','23'],0,'Geometriya','8+7+6=21.'],
[17,'Qaysi son 84 ning natural bo‘luvchisi bo‘la olmaydi?',['21','14','12','16'],3,"Bo'linish",'84 soni 16 ga bo‘linmaydi.'],
[18,'-2,5 va 9,2 sonlari orasida nechta butun son bor?',['13','10','12','11'],2,'Butun sonlar','-2 dan 9 gacha 12 ta son.'],
[19,'(6/x)·(9/16)=27/32 tenglamani yeching.',['8','4','6','2'],1,'Tenglama','54/(16x)=27/32; x=4.'],
[20,'2+(25/16)·(3+1/5) ni hisoblang.',['8','7','9','6'],1,'Arifmetika','3+1/5=16/5; ko‘paytma 5, jami 7.'],
];
const ids=new Set(data.map(x=>x.id));
for(const [n,question,options,correctOption,topic,explanation] of rows){const id=`MATH-9044419-MAJ-${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,examId:'9044419-MAJ',examLabel:'Variant 9044419 - Majburiy matematika',variantId:'9044419',sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:'verified',explanation});}
fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');
console.log(`Added 10; total ${data.length}.`);
