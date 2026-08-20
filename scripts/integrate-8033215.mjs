import fs from 'node:fs';

const target = new URL('../src/data/mathMockQuestions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
const base = { subject: 'Matematika', year: 2025, isSourceError: false };
const main = [
  [31,"a<0<b bo'lsa, ∛a³-∛b³+√a²+√b² ni soddalashtiring.",['2a+2b','2b-2a','2a','0'],3,'Modul','a-b+|a|+|b|=0.'],
  [32,"ln2 dan ln3 gacha ∫e^(-x+ln6) dx ni hisoblang.",['-1','1','ln(3/2)','0'],1,'Integral','[-6e^(-x)] chegaralarda 1.'],
  [33,"Berilgan f'(x) grafigi bo'yicha f funksiyaning [-6;6] kesmadagi lokal minimumlari sonini toping.",['4','2','3','6'],2,'Hosila grafigi',"Ikki ichki manfiydan musbatga o'tish va x=6 chegara minimumi: jami 3."],
  [34,"-0,75 soniga qarama-qarshi sonning teskarisi 1/9 dan qanchaga katta?",['2/3','1/3','1 2/9','2/9'],2,'Kasrlar','4/3-1/9=11/9.'],
  [35,'((sin(π/9)-cos(π/9))²-1)/sin(2π/9) ni hisoblang.',['-1','1','0','2'],0,'Trigonometriya','Surat -sin(2π/9), natija -1.'],
  [36,"135 sonining natural bo'luvchilari nechta?",['7','10','8','9'],2,"Bo'luvchilar",'135=3³·5; (3+1)(1+1)=8.'],
  [37,"Yuzi 108 bo'lgan parallelogrammda E va F qarama-qarshi tomonlar o'rtalari, M=AE∩BD. BEM yuzini toping.",['9','18','13,5','12'],0,'Geometriya','108/12=9.'],
  [38,'a=tan(π/4), b=tan(π/3) bo‘lsa, 3ab+2 ni toping.',['2+√3','2-3√3','2+3√3','2-√3'],2,'Trigonometriya','a=1, b=√3; natija 2+3√3.'],
  [39,'(3x+2)+(3x+4)+...+(3x+18)=63 tenglamani yeching.',['-1','2','-3','-2'],0,'Tenglama','27x+90=63; x=-1.'],
  [40,"Sayyoh yo'lning 1/8 qismini o'tgach, yo'l o'rtasigacha 15 km qoldi. Yo'l uzunligini toping.",['32','40','48','56'],1,'Kasrlar','Yo‘lning 3/8 qismi 15 km; jami 40 km.'],
  [41,'(2/(√10-1))^[9x²-(x-2)²]>1 tengsizlikni yeching.',['(-1/2;2/3)','(-∞;-1)∪(1/2;+∞)','(-∞;-1)∪(1/2;+∞)','(-1;1/2)'],3,"Ko'rsatkichli tengsizlik",'Asos 0 bilan 1 orasida; 4(2x-1)(x+1)<0.'],
  [42,"tanα=3 va sinβ=2√2/3 (α,β o'tkir) bo'lsa, sin2α+cosβ ni toping.",['15/14','14/15','5/4','4/5'],1,'Trigonometriya','3/5+1/3=14/15.'],
  [43,'x/6=5/(y+3), x va y natural sonlar. x+y ning eng katta qiymatini toping.',['8','30','28','10'],2,'Natural sonlar','x(y+3)=30; x=1,y=27 da yig‘indi 28.'],
  [44,'AB:AC:BC=5:3:4 bo‘lsa, eng katta burchakni toping.',['∠BAC',"Aniqlab bo'lmaydi",'∠ABC','∠ACB'],3,'Uchburchak','Eng katta AB tomon qarshisida ∠ACB yotadi.'],
  [45,'Berilgan f va g grafiklari bo‘yicha f(x)>g(x) tengsizlik yechimini tanlang.',['(-∞;a)∪(b;e)∪(m;+∞)','(a;n)','(-∞;a)∪(c;d)∪(n;+∞)','(a;+∞)'],2,'Grafik tengsizlik','f grafigi g dan x<a, c<x<d va x>n da yuqorida.'],
  [46,'|x²-4x+3|=x²-4|x|+3 tenglamani yeching.',['[0;+∞)','[3;+∞)','[0;1]','[0;1]∪[3;+∞)'],3,'Modulli tenglama','x<0 da yechim yo‘q; x≥0 da kvadrat uchhad manfiy bo‘lmasligi kerak.'],
  [47,'A(1;7), B(5;-4), C(-6;4), D(-5;6) nuqtalardan qaysi biri koordinata boshidan eng uzoq?',['A','B','C','D'],3,'Koordinatalar','Masofalar kvadratlari 50,41,52,61.'],
  [48,"To'g'ri burchakli uchburchak gipotenuzasi daraxt tagida 9 m va 4 m qismlarga bo'lingan. Daraxt balandligini toping.",['6','7','5','4'],0,'Geometriya','h²=9·4; h=6.'],
  [49,'3/(√8-√5)+3/(√2-√5)-1 ni hisoblang.',['√3-1','2√2+√3','√2-1','2√2-√3'],2,'Irratsional ifoda','Ratsionallashtirishdan √2-1.'],
  [50,'|(3-x)/(1+3x)|>0 tengsizlikni yeching.',['(-∞;+∞)','(-∞;-1/3)∪(-1/3;3)∪(3;+∞)','(-∞;-1/3)∪(3;+∞)','(-∞;-1/3)∪(-1/3;+∞)'],1,'Tengsizlik','x≠3 va x≠-1/3.'],
  [51,'√(x²+8x+15)+√(x²-x-20)=√(2x²+7x-5) tenglamaning haqiqiy ildizlari yig‘indisini toping.',['-4','-7','-12','0'],0,'Irratsional tenglama','Aniqlanish sohasi va kvadratlashdan ildizlar yig‘indisi -4.'],
  [52,"Venn diagrammada (A'∪B')∩(A∪B) to'plam elementlarini aniqlang.",['{c,d,e,f,g,h}','{i,j,k}','{f,g,h}','{a,b,i,j,k}'],0,"To'plamlar",'Bu A va B ning simmetrik ayirmasi.'],
  [53,'(x²-4x+5)/((x²-17)(x-1))≤0 tengsizlikning natural yechimlari yig‘indisini toping.',['10','7','12','9'],3,'Ratsional tengsizlik','Natural yechimlar 2,3,4; yig‘indi 9.'],
  [54,'ABC uchburchak yuzi 48. BD medianani E va F teng uchga bo‘ladi (E nuqta B ga yaqin). AEF yuzini toping.',['4','9','8','7'],2,'Geometriya','AEF yuzi ABC yuzining 1/6 qismi: 8.'],
  [55,"To'g'ri burchakli parallelepiped qirralari yig'indisi 20 dm, to'la sirt yuzi 16 dm². Diagonalini toping.",['3','√10','2√2','2'],0,'Stereometriya','a+b+c=5, ab+bc+ca=8; d²=25-16=9.'],
  [56,'f(x)=11x+b funksiya b ning qanday qiymatlarida kamayuvchi bo‘ladi?',['b>0','Ixtiyoriy b∈R da kamayuvchi bo‘lmaydi','b<0','b=0'],1,'Chiziqli funksiya','Qiyalik 11>0, funksiya har doim o‘suvchi.'],
  [57,'4 ta fizika va 2 ta matematika kitobi javonga, matematika kitoblari yonma-yon bo‘lish sharti bilan, necha usulda joylashtiriladi?',['240','360','144','120'],0,'Kombinatorika','5!·2!=240.'],
  [58,"Konus o'q kesimi tomoni 6/√π cm bo'lgan muntazam uchburchak. To'la sirt yuzini toping.",['12π','9π','27','36'],2,'Stereometriya','2r=l=s; πr(r+l)=3πs²/4=27.'],
  [59,'3·3^(lg(x²))+11·3^(lg x)=4 tenglamani yeching.',['0,1','100','0,01','10'],0,"Ko'rsatkichli tenglama",'t=3^(lg x)>0; 3t²+11t-4=0 dan t=1/3, x=0,1.'],
  [60,'(1/sin²α-1/cos²α)·(sin2α·tgα)/(tg²α-1)+1 ni soddalashtiring.',['1-sinα','-2','1-cosα','-1'],3,'Trigonometriya','Ko‘paytma -2, butun ifoda -1.'],
];
const mandatory = [
  [11,'10(x-4)=6x tenglamani yeching.',['12','10','9','15'],1,'Tenglama','x=10.'],
  [12,"Tog' cho'qqisiga 8 ta yo'l bor. Bittasini necha usulda tanlash mumkin?",['4','1','2','8'],3,'Kombinatorika','8 usul.'],
  [13,'(-2ab)³:(ab)³ ni soddalashtiring.',['-6','-8a⁶b⁶','-8','-6a⁶b⁶'],2,'Darajalar','((-2ab)/(ab))³=-8.'],
  [14,'Katakli chizmadagi α va β burchaklar uchun qaysi tenglik o‘rinli?',['2α+β=90°','α+2β=90°','2α+β=180°','α+β=90°'],1,'Burchaklar','Katak yo‘nalishlaridan α+2β=90°.'],
  [15,'1 m balandlikdagi silindrsimon idishga 5 litr suv quyilganda suv sathi x balandlikda. 2,5 litr uchun x ni toping.',['0,5','0,4','0,6','0,65'],0,'Proporsiya','Bir xil kesimda yarim hajm yarim balandlik: 0,5 m.'],
  [16,'Ombor yuzi 3:5 nisbatda ikki xonaga bo‘lingan. Umumiy yuzi 120 m² bo‘lsa, kichik xona yuzini toping.',['80','65','45','75'],2,'Nisbat','120·3/8=45.'],
  [17,'Hajmi 180 cm³ parallelepipedning ikki qirrasi 5 cm va 4 cm. Barcha qirralari yig‘indisini toping.',['18','108','36','72'],3,'Stereometriya','Uchinchi qirra 9; 4(5+4+9)=72.'],
  [18,'Qaysi yig‘indi 1978 ga teng?',['1000+900+70+8','1000+900+80+7','1000+800+70+9','1000+800+90+7'],0,'Xona birliklari','1978=1000+900+70+8.'],
  [19,'23/7 noto‘g‘ri kasrning butun qismi nechaga teng?',['4','2','3','23'],2,'Kasrlar','23=7·3+2.'],
  [20,'ABC to‘g‘ri burchakli uchburchak yuzi 54 cm², katetlardan biri 12 cm. AC ni toping.',['10','9','6','13'],1,'Uchburchak','12·AC/2=54; AC=9.'],
];

const additions = main.map(([n, question, options, correctOption, topic, explanation]) => ({
  id: `MATH-8033215-${n}`, variantId: '8033215', sourceQuestionNumber: n,
  question, options, correctOption, ...base, topic, validationStatus: 'verified', explanation,
}));
additions.push(...mandatory.map(([n, question, options, correctOption, topic, explanation]) => ({
  id: `MATH-8033215-MAJ-${n}`, examId: '8033215-MAJ',
  examLabel: 'Variant 8033215 - Majburiy matematika', variantId: '8033215',
  sourceQuestionNumber: n, question, options, correctOption, ...base, topic,
  validationStatus: 'verified', explanation,
})));

const ids = new Set(data.map(({ id }) => id));
for (const item of additions) {
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  data.push(item);
}
fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Added ${additions.length}; total ${data.length}.`);
