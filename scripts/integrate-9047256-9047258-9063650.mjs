import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const sets={
'9047256':[
[11,'0,2,4,6,8 raqamlaridan takrorlamasdan ko‘pi bilan nechta ikki xonali natural son tuzish mumkin?',['15','16','25','20'],1,'Kombinatorika','O‘nlik uchun 4, birlik uchun qolgan 4 tanlov: 16.'],
[12,'Katakli rasmda bo‘yalgan 5×3 cm to‘g‘ri to‘rtburchak yuzini mm² da toping.',['15','150','1500','15000'],2,"O'lchov birliklari",'15 cm²=1500 mm².'],
[13,'Diagramma bo‘yicha 1-korxonaning aprel va 3-korxonaning may ko‘rsatkichlari yig‘indisini toping.',['80','77','79','78'],2,'Diagramma','45+34=79.'],
[14,'Katakli chizmadagi α va β uchun to‘g‘ri tenglikni tanlang.',['α+β=90°','α+2β=90°','2α+β=90°','2α+β=180°'],2,'Burchaklar','Katak yo‘nalishlaridan 2α+β=90°.'],
[15,'Qaysi tenglik to‘g‘ri?',['40=8·4+8','40=7·5+6','40=6·5+9','40=6·5+6'],0,'Arifmetika','8·4+8=40.'],
[16,'Qirrasi a bo‘lgan kubning to‘la sirt yuzi formulasini tanlang.',['6a²','3a','4a²','a³'],0,'Stereometriya','6 ta a² yuz: 6a².'],
[17,'240 m³ suv hovuz hajmining 80% ini egallaydi. Hovuz hajmini toping.',['240','300','320','360'],1,'Foiz','240/0,8=300.'],
[18,'x:12=4 3/4 : 7 1/8 proporsiyada x ni toping.',['8','2','12','4'],0,'Proporsiya','(19/4)/(57/8)=2/3; x=8.'],
[19,'Diametri 10 dm bo‘lgan doiraning bo‘yalgan yarim qismi yuzini toping.',['50π','20π','25π','12,5π'],3,'Geometriya','r=5; yarim doira yuzi 25π/2=12,5π.'],
[20,'(-2ab)³:(ab)³ ni soddalashtiring.',['-6','-6a⁶b⁶','-8a⁶b⁶','-8'],3,'Darajalar','((-2ab)/(ab))³=-8.'],
],
'9047258':[
[11,'x : 5/7 = 8 3/4 proporsiyada x ni toping.',['6 1/4','4/49','12','12 1/2'],0,'Proporsiya','x=(5/7)(35/4)=25/4=6 1/4.'],
[12,'Diametri 10 dm bo‘lgan doiraning bo‘yalgan yarim qismi yuzini toping.',['25π','20π','12,5π','50π'],2,'Geometriya','Yarim doira yuzi 25π/2=12,5π.'],
[13,'Qaysi tenglik to‘g‘ri?',['40=8·4+8','40=6·5+9','40=6·5+6','40=7·5+6'],0,'Arifmetika','8·4+8=40.'],
[14,'4 soat 34 daqiqa necha daqiqa?',['214','244','264','274'],3,'Vaqt','4·60+34=274.'],
[15,'Qirralari a,b,c bo‘lgan to‘g‘ri burchakli parallelepiped hajmi formulasini tanlang.',['6a²','a+b+c','abc','a·b+c'],2,'Stereometriya','V=abc.'],
[16,'(25x+3)/(3x+7)=5 tenglamani yeching.',['-3,1','3,2','-3,5','3,3'],1,'Tenglama','25x+3=15x+35; x=3,2.'],
[17,'500 tonna ko‘mirning 30% i dekabrda, 35% i yanvarda ishlatildi. Yanvarda necha tonna ko‘p ishlatilgan?',['15','25','20','35'],1,'Foiz','500·(0,35-0,30)=25.'],
[18,'(-2ab)³:(ab)³ ni soddalashtiring.',['-8a⁶b⁶','-6','-6a⁶b⁶','-8'],3,'Darajalar','Natija -8.'],
[19,'3 ta har xil masalani ketma-ket yechish tartibi necha xil?',['6','4','3','2'],0,'Kombinatorika','3!=6.'],
[20,'Diagramma bo‘yicha 2-korxonaning aprel va 3-korxonaning mart ko‘rsatkichlari yig‘indisini toping.',['84','80','78','82'],1,'Diagramma','44+36=80.'],
],
'9063650':[
[11,'-9,7<x<3,3 ni qanoatlantiruvchi eng kichik butun sonni toping.',['1','-10','-9','0'],2,'Tengsizlik','-9,7 dan katta eng kichik butun son -9.'],
[12,'(71-3x)/(6x-9)=1/3 tenglamani yeching.',['14,8','14,5','14','-14,6'],0,'Tenglama','213-9x=6x-9; x=14,8.'],
[13,'Perimetri 12 cm bo‘lgan to‘g‘ri uchburchakning ikki tomoni 5 va 3 cm. Uchinchi tomonini toping.',['3','4','2','1'],1,'Uchburchak','12-5-3=4.'],
[14,'10(x-4)=6x tenglamani yeching.',['12','10','9','15'],1,'Tenglama','x=10.'],
[15,'-5,4-10+6+4-0,25-(-5,4)+0,2+0,05 ni hisoblang.',['0','-1','2','1'],0,'Arifmetika','Qarama-qarshi hadlar qisqarib, natija 0.'],
[16,'To‘g‘ri burchakli parallelepiped uchlari soni nechta?',['6','12','8','4'],2,'Stereometriya','8 ta uchi bor.'],
[17,'Qaysi yig‘indi 1879 ga teng?',['1000+800+90+7','1000+900+70+8','1000+800+70+9','1000+900+80+7'],2,'Xona birliklari','1879=1000+800+70+9.'],
[18,'1,3,5,7,9 raqamlaridan takrorlamasdan nechta ikki xonali son tuzish mumkin?',['25','15','20','16'],2,'Kombinatorika','5·4=20.'],
[19,'(-2ab)⁴:(ab)³ ni soddalashtiring.',['-8a⁷b⁷','8ab','-16a⁷b⁷','16ab'],3,'Darajalar','16a⁴b⁴/(a³b³)=16ab.'],
[20,'Silindrsimon idishda 2,5 litr suv 0,45 m balandlikni egallaydi, idish balandligi 0,9 m. Limmo-lim bo‘lishi uchun yana necha litr suv kerak?',['3','2,7','2,4','2,5'],3,'Proporsiya','To‘liq sig‘im 5 litr; yana 2,5 litr kerak.'],
]};
const ids=new Set(data.map(x=>x.id));
for(const [variantId,rows] of Object.entries(sets))for(const [n,question,options,correctOption,topic,explanation] of rows){const id=`MATH-${variantId}-MAJ-${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,examId:`${variantId}-MAJ`,examLabel:`Variant ${variantId} - Majburiy matematika`,variantId,sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:'verified',explanation});}
fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');
console.log(`Added 30; total ${data.length}.`);
