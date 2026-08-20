import fs from 'node:fs';
const target=new URL('../src/data/mathMockQuestions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(target,'utf8'));
const main=[
[31,'a=-1/2 bo‘lsa, a¹²·(a⁻⁴)⁴ ni toping.',['64','16','8','32'],1,'Darajalar','a⁻⁴=16.'],
[32,'(-10)³:(-10)²-(-9)³:(-9)+(-6)⁶:(-6)⁵ ni hisoblang.',['77','-65','-97','-85'],2,'Arifmetika','-10-81-6=-97.'],
[33,'√((2x+1)²)-3(2x+5)=-8 tenglama ildizini toping.',['-1','3','2','1'],0,'Modulli tenglama','|2x+1|=6x+7 dan x=-1.'],
[34,'(10^(n+1)-4·10^n)/(10^(n+1)+5·10^n) ni qisqartiring.',['5/2','2/5','2/3','3/2'],1,'Kasrlar','10^n qisqarib, 6/15=2/5.'],
[35,'∫(x+1)/(x²+2x+20) dx ni hisoblang.',['ln√(x²+2x+20)+C','ln((x²+2x+20)^-2)+C','ln((x²+2x+20)^2)+C','ln((x²+2x+20)^-1)+C'],0,'Integral','Surat maxraj hosilasining yarmi.'],
[36,'f((4x+1)/2)=(8x+1)/3 bo‘lsa, f(2)-f(-1) ni toping.',['4','2','-3','1,5'],0,'Funksiya','f(t)=(4t-1)/3; ayirma 4.'],
[37,'Birinchi son 10%, ikkinchi son 30% orttirilsa, ko‘paytma necha foiz ortadi?',['40','44','31','43'],3,'Foiz','1,1·1,3=1,43.'],
[38,'Hech qaysi uchtasi bir chiziqda yotmagan 12 nuqtadan ko‘pi bilan nechta kesma hosil bo‘ladi?',['132','78','66','12'],2,'Kombinatorika','C(12,2)=66.'],
[39,'To‘g‘ri burchakli uchburchak ichki aylanasining urinish nuqtasi gipotenuzani 5 va 12 ga bo‘ladi. Kichik katetni toping.',['9','7','8','12'],2,'Uchburchak','Bu 8-15-17 uchburchak; kichik katet 8.'],
[40,'A={a,b,c,d}. B⊆A va B≠∅, B≠A shartlarini qanoatlantiruvchi B lar sonini toping.',['16','14','32','30'],1,"To'plamlar",'2⁴-2=14.'],
[41,'(a²b²+6ab+8)/(ab+4)-(a²b²-4)/(ab-2), a=3/8,b=1/4.',['1/4','-6','-4','0'],3,'Algebra','Har ikki kasr ab+2 ga teng; ayirma 0.'],
[42,'Nechta butun son √(x+1)-⁴√(2x²+14)>0 tengsizlik yechimi?',['4','2','0','Cheksiz ko‘p'],2,'Irratsional tengsizlik','(x+1)²>2x²+14 tengsizlik haqiqiy yechim bermaydi.'],
[43,'√(54-14√5)·(7+√5) ni hisoblang.',['45','49','44','54'],2,'Irratsional ifoda','54-14√5=(7-√5)²; ko‘paytma 44.'],
[44,'cos²α·ctg²α/sin²α ni soddalashtiring.',['tg⁴α','ctg²α','ctg⁴α','1'],2,'Trigonometriya','Natija cos⁴α/sin⁴α=ctg⁴α.'],
[45,'Qaysi son ikkita tub son ayirmasiga teng bo‘lmaydi?',['23','29','16','24'],0,'Tub sonlar','Toq ayirma uchun tub sonlardan biri 2; 23+2=25 tub emas.'],
[46,'Piramida uchlari va yoqlari soni yig‘indisi 44. Asos diagonallari sonini toping.',['170','189','135','209'],1,'Kombinatorika','2(n+1)=44, n=21; n(n-3)/2=189.'],
[47,"Berilgan f(x) grafigi bo‘yicha hosilalar taqqoslanishidan to‘g‘risini tanlang.",["f'(x12)>f'(x3)","f'(x8)>f'(x9)","f'(x9)<f'(x2)","f'(x12)<f'(x13)"],0,'Hosila grafigi','x12 da grafik o‘sadi, x3 da esa qiyalik kichikroq.'],
[48,'f(x)=4x/(x+2) funksiyaning aniqlanish sohasini toping.',['(-∞;-2)∪[0;∞)','(-∞;-2)∪(-2;∞)','(-∞;-2)','(-∞;0]'],1,'Funksiya','x≠-2.'],
[49,'f(x)=3+2x-x² funksiyaga x₀=1 nuqtada o‘tkazilgan urinmaning burchak koeffitsiyentini toping.',['1','0','2','4'],1,'Hosila',"f'(x)=2-2x; f'(1)=0."],
[50,'Konus asos diametri 6 cm, balandligi 6 cm. Hajmini toping.',['9π','36π','18π','27π'],2,'Stereometriya','r=3,h=6; V=πr²h/3=18π.'],
[51,'2000 2000/2221 + 200 200/2221 + 20 20/2221 + 1 1/2221 ni hisoblang.',['2222','2223','2221','2021'],0,'Arifmetika','Butun qismlar 2221, kasrlar yig‘indisi 1.'],
[52,'3-6+12-24+...-384 ni hisoblang.',['-189','-225','-275','-255'],3,'Progressiya','3·(1-(-2)^8)/(1+2)=-255.'],
[53,'To‘g‘ri burchakli uchburchak o‘tkir burchaklari bissektrisalari orasidagi o‘tmas burchakni toping.',['150°','115°','120°','135°'],3,'Geometriya','Inmarkazdagi burchak 90°+90°/2=135°.'],
[54,'2^(x+6)·3^(2x)=3^(x+3)·2^(3x) tenglamani yeching.',['5','3','2','4'],1,"Ko'rsatkichli tenglama",'Tub asoslar darajalarini tenglashtirishdan x=3.'],
[55,'A(2;2) nuqtaning x=4 va y=3 chiziqlarga nisbatan simmetrik B,C nuqtalari uchun AB+AC vektor koordinatalarini toping.',['(-4;-2)','(4;2)','(4;-2)','(-4;2)'],1,'Vektorlar','B=(6,2), C=(2,4); AB+AC=(4,2).'],
[56,'16^(log₄(2x-1))+(1-2x)²≥18 tengsizlikni yeching.',['(-∞;-1]∪[2;∞)','[-1;2]','[-1;0,5)∪(0,5;2]','[2;∞)'],3,'Logarifmik tengsizlik','2(2x-1)²≥18 va logarifm sohasi x>0,5; natija [2;∞).'],
[57,'{|x-3|=3√(y+2), |y+2|=3√(x-3)} sistema barcha yechimlari ordinatalari yig‘indisini toping.',['7','-2','15','5'],3,'Tenglamalar sistemasi','Yechim ordinatalari -2 va 7; yig‘indi 5.'],
[58,'ABC teng yonli (AB=BC), C dan AB ga CD mediana. AC=2BD bo‘lsa, ∠ABC ni toping.',['60°','120°','90°','75°'],0,'Uchburchak','Tomonlar tengligidan hosil bo‘lgan uchburchak teng tomonli; burchak 60°.'],
[59,'P,F,O bir chiziqda, PF=200 m, minora uchiga ko‘tarilish burchaklari P da 41°, F da 48°. Balandlikni toping.',['100sin41°sin48°/sin7°','200/(ctg48°-ctg41°)','200/(ctg41°-ctg48°)','200sin41°sin48°/sin9°'],2,'Trigonometriya','h=200/(ctg41°-ctg48°).'],
[60,'sin4x=sin3x tenglamaning eng kichik musbat yechimini toping.',['4π/7','2π/7','6π/7','π/7'],3,'Trigonometriya','4x=π-3x; x=π/7.'],
];
const maj=[
[11,'54 o‘quvchining har biriga 9 tadan darslik berilsa, jami nechta kitob kerak?',['6','477','9','486'],3,'Arifmetika','54·9=486.'],
[12,'Chizmadagi shaklning qancha qismi bo‘yalgan?',['1/3','3/8','5/8','3/7'],1,'Kasrlar','8 teng uchburchakdan 3 tasi bo‘yalgan.'],
[13,'1/2+1/4+1/6+1/12 ni hisoblang.',['11/12','1/6','1','9/12'],2,'Kasrlar','(6+3+2+1)/12=1.'],
[14,'Benzin baki va kanistr hajmlari 9:1. To‘la bakni bo‘shatish uchun nechta kanistr kerak?',['9','6','8','7'],0,'Nisbat','Bak hajmi 9 kanistrga teng.'],
[15,'1 fut 305 mm bo‘lsa, 2135 mm necha fut?',['8','6','5','7'],3,"O'lchov birliklari",'2135/305=7.'],
[16,'16 o‘quvchidan birini necha usulda tanlash mumkin?',['1','16','8','12'],1,'Kombinatorika','16 usul.'],
[17,'4,6x-9,4x=4-5,8x tenglamani yeching.',['7,1','3,7','2,3','4'],3,'Tenglama','x=4.'],
[18,'(132+18):5·3-10 ni hisoblang.',['80','0','90','210'],0,'Arifmetika','150/5·3-10=80.'],
[19,'18 ta shokolad har bir farzandga 6 tadan berildi. Farzandlar sonini toping.',['3','4','2','5'],0,'Arifmetika','18/6=3.'],
[20,'O‘lchamlari 4×5×1 cm bo‘lgan 4 ta quti ustma-ust qo‘yildi. Jism hajmini toping.',['79','85','80','83'],2,'Stereometriya','Har biri 20 cm³; jami 80 cm³.'],
];
const ids=new Set(data.map(x=>x.id));
function add(rows,majburiy=false){for(const [n,question,options,correctOption,topic,explanation] of rows){const id=`MATH-9044418-${majburiy?'MAJ-':''}${n}`;if(ids.has(id))throw Error(`Duplicate ${id}`);data.push({id,...(majburiy?{examId:'9044418-MAJ',examLabel:'Variant 9044418 - Majburiy matematika'}:{}),variantId:'9044418',sourceQuestionNumber:n,question,options,correctOption,subject:'Matematika',year:2025,topic,isSourceError:false,validationStatus:'verified',explanation});}}
add(main);add(maj,true);
fs.writeFileSync(target,`${JSON.stringify(data,null,2)}\n`,'utf8');
console.log(`Added 40; total ${data.length}.`);
