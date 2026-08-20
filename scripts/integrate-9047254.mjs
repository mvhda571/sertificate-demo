import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const main=[
[31,'144 ning barcha natural bo‘luvchilari sonini toping.',['12','15','14','16'],1,'Bo‘luvchilar','144=2⁴·3²; (4+1)(2+1)=15.'],
[32,'9^(log₃(3-x))+(x-3)²>50 tengsizlikni yeching.',['(-∞;-2)','(-∞;-2]∪[8;∞)','x∈∅','[-2;3)'],0,'Logarifmik tengsizlik','Logarifm sohasi x<3 va 2(x-3)²>50; natija x<-2.','corrected'],
[33,'Ko‘ylak narxi ketma-ket ikki marta 30% ga arzonlashdi. Dastlabki narxga nisbatan necha foiz arzonlashdi?',['69','60','51','49'],2,'Foiz','0,7²=0,49; pasayish 51%.'],
[34,'ABC yuzi 192. E∈AB, F∈BC, D∈AC; EF∥AC, ED∥BC va AB:EB=8:5. DEFC yuzini toping.',['90','96','94','78'],0,'Geometriya','BEF=75, AED=27; DEFC=192-75-27=90.'],
[35,'cos(π/7)·cos(2π/7)·cos(4π/7) ni hisoblang.',['-1','-1/8','-1/2','-1/4'],1,'Trigonometriya','Mashhur ayniyat bo‘yicha -1/8.'],
[36,'√(x²+8x+15)+√(x²-x-20)=√(2x²+7x-5) tenglama haqiqiy ildizlari ko‘paytmasini toping.',['-5','-25','-300','100'],1,'Irratsional tenglama','Radikandlar yig‘indisi o‘ng tomonda; ildizlar -5 va 5, ko‘paytma -25.'],
[37,'0 dan 3 gacha ∫x/√(1+x²) dx ni hisoblang.',['√10+1','√10-1','2','2√5-1'],1,'Integral','[√(1+x²)]₀³=√10-1.'],
[38,'0,1,2,3,4 raqamlaridan takrorlanish bilan 4 ga karrali nechta uch xonali son tuzish mumkin?',['40','24','32','28'],2,'Kombinatorika','Oxirgi ikki raqam uchun 8 juftlik, yuzlik uchun 4 tanlov: 32.'],
[39,'y=13x-21 funksiyaning ordinatalar o‘qiga nisbatan simmetrigini toping.',['y=-13x+21','y=13x+21','y=13x-21','y=-13x-21'],3,'Funksiya','x o‘rniga -x qo‘yiladi: y=-13x-21.'],
[40,'Sₙ=4n²-3n bo‘lgan arifmetik progressiya ayirmasini toping.',['-8','-4','4','8'],3,'Progressiya','Sₙ ning n² oldidagi koeffitsiyenti d/2; d=8.'],
[41,'(3a-2b)/(2a+3b), bunda a=2,b=3.',['0','1','1/13','5/13'],0,'Algebra','Surat 6-6=0.'],
];
const maj=[
[11,'2 soat 33 daqiqa necha daqiqa?',['183','93','153','163'],2,'Vaqt','120+33=153.'],
[12,'Qirralari a,b,c bo‘lgan to‘g‘ri burchakli parallelepiped hajmi formulasini tanlang.',['abc','a·b+c','6a²','a+b+c'],0,'Stereometriya','V=abc.'],
[13,'(-2ab)⁴:(ab)³ ni soddalashtiring.',['16ab','-16a⁷b⁷','-8a⁷b⁷','8ab'],0,'Darajalar','16a⁴b⁴/(a³b³)=16ab.'],
[14,'Qaysi tenglik to‘g‘ri?',['42=7·5+6','42=6·5+9','42=6·5+6','42=8·4+10'],3,'Arifmetika','8·4+10=42.'],
[15,'O‘quvchi 3 ta har xil masalani ketma-ket yechish tartibini necha usulda tanlaydi?',['4','6','2','3'],1,'Kombinatorika','3!=6.'],
[16,'Diagramma bo‘yicha 1-korxonaning aprel va 3-korxonaning may ko‘rsatkichlari yig‘indisini toping.',['80','78','79','77'],2,'Diagramma','45+34=79.'],
[17,'8x/(36x-21)=1/2 tenglamani yeching.',['-20/21','-21/20','20/21','21/20'],3,'Tenglama','16x=36x-21; x=21/20.'],
[18,'Katakli chizmadagi α va β uchun to‘g‘ri tenglikni tanlang.',['α+2β=90°','α+β=90°','2α+β=180°','2α+β=90°'],3,'Burchaklar','Katak yo‘nalishlaridan 2α+β=90°.'],
[19,'x : 1 1/11 = 1 3/22 proporsiyada x ni toping.',['1 24/125','1 29/121','1 11/121','2 1/121'],1,'Proporsiya','x=(12/11)(25/22)=150/121=1 29/121.'],
[20,'Perimetri 56 cm, gipotenuzasi 25 cm va kateti 24 cm bo‘lgan to‘g‘ri uchburchakda ikkinchi katetni toping.',['8','6','9','7'],3,'Uchburchak','7-24-25 uchburchak; x=7.'],
];
const ids=new Set(data.map(x=>x.id));
function add(rows,m=false){for(const row of rows){const [n,question,options,correctOption,topic,explanation,status='verified']=row;const id=`MATH-9047254-${m?'MAJ-':''}${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,...(m?{examId:'9047254-MAJ',examLabel:'Variant 9047254 - Majburiy matematika'}:{}),variantId:'9047254',sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:status,explanation});}}
add(main);add(maj,true);
fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');
console.log(`Added ${main.length+maj.length}; total ${data.length}.`);
