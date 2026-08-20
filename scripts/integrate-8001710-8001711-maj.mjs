import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const sets={
'8001710':[
[11,'Diagramma bo‘yicha 1-korxonaning mart va 2-korxonaning may ko‘rsatkichlari yig‘indisini toping.',['86','84','92','88'],3,'Diagramma','48+40=88.'],
[12,'Katakli V shaklidagi chizmada α va β uchun to‘g‘ri tenglikni tanlang.',['α+β=90°','α+2β=180°','2α+β=180°','2α+β=90°'],2,'Burchaklar','Simmetrik qiya chiziqlar va to‘g‘ri chiziqdan 2α+β=180°.'],
[13,'5-7+9-11+13-15+17-19+21-23+11·2 ni hisoblang.',['-2','12','8','0'],1,'Arifmetika','Beshta juftlik -10, oxirgi had 22; natija 12.'],
[14,'Ikki yuzta yuzni va bitta birni qo‘shib qanday natija olinadi?',['2001','2101','20001','201'],2,'Xona birliklari','200·100+1=20001.'],
[15,'Asosi 6+4=10 dm, balandligi 3 dm bo‘lgan uchburchak yuzini toping.',['18','30','21','15'],3,'Geometriya','10·3/2=15.'],
[16,'To‘g‘ri burchakli parallelepiped qirralari soni nechta?',['12','16','6','8'],0,'Stereometriya','12 ta qirra.'],
[17,'Qaysi tenglik to‘g‘ri?',['42=6·5+6','42=8·4+10','42=7·5+6','42=6·5+9'],1,'Arifmetika','8·4+10=42.'],
[18,"Tog' cho'qqisiga 8 ta yo‘l bor. Bittasini necha usulda tanlash mumkin?",['2','1','8','4'],2,'Kombinatorika','8 usul.'],
[19,'Ombor 3:5 nisbatda ikki xonaga bo‘lingan, umumiy yuzi 120 m². Katta xona yuzini toping.',['65','80','75','45'],2,'Nisbat','120·5/8=75.'],
[20,'12 litr sig‘imli silindrsimon idishning 1/4 qismi bo‘sh. Idishda qancha suv bor?',['9','10','6','8'],0,'Kasrlar','12·3/4=9 litr.'],
],
'8001711':[
[11,'-7,5 dan katta va 7,6 dan kichik nechta butun son bor?',['13','12','14','15'],3,'Butun sonlar','-7 dan 7 gacha 15 ta.'],
[12,'8 ta har xil misoldan bittasini necha usulda tanlash mumkin?',['8','2','3','4'],0,'Kombinatorika','8 usul.'],
[13,'8(2-x)=7(1-x) tenglamani yeching.',['9','8','7','10'],0,'Tenglama','16-8x=7-7x; x=9.'],
[14,'Diagrammada palovni yoqtiruvchilar manti yoqtiruvchilardan nechta ko‘p?',['8','7','9','6'],1,'Diagramma','19-12=7.'],
[15,'Katakli V shaklidagi chizmada α va β uchun to‘g‘ri tenglikni tanlang.',['2α+β=90°','α+2β=180°','2α+β=180°','α+β=90°'],2,'Burchaklar','2α+β=180°.'],
[16,'Hajmi 168 cm³, balandligi 7 cm bo‘lgan parallelepiped asos yuzini toping.',['22','21','24','23'],2,'Stereometriya','168/7=24.'],
[17,'1 km yo‘lning 275 m va 0,32 km qismi ta’mirlandi. Necha metr qoldi?',['395','425','415','405'],3,"O'lchov birliklari",'1000-275-320=405.'],
[18,'(1234+1453)-453 ni hisoblang.',['2234','2423','2432','2324'],0,'Arifmetika','1453-453=1000; jami 2234.'],
[19,'(-2ab)³:(ab)³ ni soddalashtiring.',['-6','-8a⁶b⁶','-8','-6a⁶b⁶'],2,'Darajalar','Natija -8.'],
[20,'Chizmadagi o‘tmas burchakni tanlang.',['∠AOC','∠AOD','∠BOC','∠BOD'],1,'Burchaklar','OA va OD nurlari orasidagi ∠AOD o‘tmas.'],
]};
const ids=new Set(data.map(x=>x.id));
for(const [variantId,rows] of Object.entries(sets))for(const row of rows){let [n,question,options,correctOption,topic,explanation,status='verified',correctedOption]=row;if(correctedOption!==undefined)correctOption=correctedOption;const id=`MATH-${variantId}-MAJ-${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,examId:`${variantId}-MAJ`,examLabel:`Variant ${variantId} - Majburiy matematika`,variantId,sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:status,explanation});}
fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');console.log(`Added 20; total ${data.length}.`);
