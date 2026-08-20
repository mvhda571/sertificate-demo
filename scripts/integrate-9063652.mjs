import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const main=[
[31,'ln2 dan ln3 gacha ∫e^(-x+ln6) dx ni hisoblang.',['1','-1','0','ln(3/2)'],0,'Integral','[-6e^(-x)] chegaralarda 1.'],
[32,'Qayiq tezligi 3 km/soat, quruqlikda 5 km/soat; chizmadagi masofalar 4 km va 7,5 km. Uyga eng kamida necha daqiqada yetadi?',['77','150','154','145'],2,'Ekstremum','Optimal yo‘lda suvga 100 va quruqlikka 54 daqiqa: jami 154.'],
[33,'3x+12≥0 va x+3≤1 sistemani qanoatlantiruvchi x ning eng kichik butun qiymatini toping.',['-2','-1','-3','-4'],3,'Tengsizliklar sistemasi','-4≤x≤-2; eng kichik butun qiymat -4.'],
[34,'x=1,y=4 da (√(x/y)+√(y/x)+2):(√x+√y) ni hisoblang.',['4/3','3/2','2/3','3/4'],1,'Algebra','(1/2+2+2)/(1+2)=3/2.'],
[35,"Venn diagramma bo‘yicha (A∪B)∩C' elementlarini toping.",['{3,6,7,8,13,14,15,19}','{6,8,13,14,15,19}','{3,6,7,8,13,14,15,16,18,19,20}','{1,2,3,4,5,6,7,8,9,13,14,15,19}'],0,"To'plamlar",'A yoki B ga kirib, C ga kirmaydigan elementlar birinchi to‘plamni beradi.'],
[36,'f(x)=x⁵·ln(4x)/5-x⁵/25+5 funksiyaning x₀=1 dagi hosilasini toping.',['2ln4','-ln4','3ln2','ln4'],3,'Hosila',"f'(x)=x⁴ln(4x); f'(1)=ln4."],
[37,'sin8α+cos(8α-16π)·ctg(4α+3π/4)+3 ni soddalashtiring.',['2','3','cos4α+2','sin4α+2'],0,'Trigonometriya','Davriylik va trigonometrik ayniyatlardan ifoda 2 ga teng.'],
[38,"Berilgan f'(x) grafigi bo‘yicha f funksiyaning [-3;5] kesmadagi lokal minimumlari sonini toping.",['3','1','2','4'],2,'Hosila grafigi',"f' manfiydan musbatga bir marta o‘tadi va x=5 kamayuvchi chegara minimumi; jami 2."],
];
const maj=[
[11,'(25x+3)/(3x+7)=5 tenglamani yeching.',['3,3','-3,1','3,2','-3,5'],2,'Tenglama','x=3,2.'],
[12,'To‘g‘ri burchakli parallelepiped yoqlari soni nechta?',['4','8','6','12'],2,'Stereometriya','6 ta yoq.'],
[13,'(-2ab)³:(ab)³ ni soddalashtiring.',['-8a⁶b⁶','-6','-6a⁶b⁶','-8'],3,'Darajalar','Natija -8.'],
[14,'Diagramma bo‘yicha 1-korxonaning aprel va 3-korxonaning may ko‘rsatkichlari yig‘indisini toping.',['77','79','78','80'],1,'Diagramma','45+34=79.'],
[15,'Aylana uzunligi 8π cm bo‘lsa, radiusini toping.',['4','6','8','2'],0,'Aylana','2πr=8π; r=4.'],
[16,'20(2-x)=19(1-x) tenglamani yeching.',['20','21','22','19'],1,'Tenglama','x=21.'],
[17,'Qaysi yig‘indi 1978 ga teng?',['1000+900+70+8','1000+800+70+9','1000+800+90+7','1000+900+80+7'],0,'Xona birliklari','1978=1000+900+70+8.'],
[18,'4 soat 34 daqiqa necha daqiqa?',['264','274','244','214'],1,'Vaqt','4·60+34=274.'],
[19,"Tog' cho'qqisiga 8 ta yo‘l bor. Bittasini necha usulda tanlash mumkin?",['1','2','4','8'],3,'Kombinatorika','8 usul.'],
[20,'500 tonna ko‘mirning 30% i dekabrda, 35% i yanvarda ishlatildi. Yanvarda necha tonna ko‘p?',['35','15','20','25'],3,'Foiz','500·5%=25.'],
];
const ids=new Set(data.map(x=>x.id));function add(rows,m=false){for(const [n,question,options,correctOption,topic,explanation] of rows){const id=`MATH-9063652-${m?'MAJ-':''}${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,...(m?{examId:'9063652-MAJ',examLabel:'Variant 9063652 - Majburiy matematika'}:{}),variantId:'9063652',sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:'verified',explanation});}}
add(main);add(maj,true);fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');console.log(`Added 18; total ${data.length}.`);
