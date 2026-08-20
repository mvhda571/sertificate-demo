import fs from 'node:fs/promises'
import path from 'node:path'

const dataPath = path.resolve('src/data/mathMockQuestions.json')
const questions = JSON.parse(await fs.readFile(dataPath, 'utf8'))

// [page file, x%, y%, width%, height%]. Only the drawing is inside each box.
const crops = {
  'MATH-8001711-31':['8001711-p1.png',8,16,27,13], 'MATH-8001711-32':['8001711-p1.png',9,53,37,11],
  'MATH-8001711-37':['8001711-p2.png',11,42,17,14], 'MATH-8001711-43':['8001711-p3.png',7,61,41,19],
  'MATH-8001711-53':['8001711-p5.png',7,7,24,15], 'MATH-8001711-54':['8001711-p5.png',8,30,36,16],
  'MATH-8001711-57':['8001711-p6.png',7,70,19,14], 'MATH-8010023-58':['8010023-p5.png',8,11,27,17],
  'MATH-8010025-39':['8010025-p2.png',11,7,34,14], 'MATH-8010025-41':['8010025-p2.png',10,54,23,12],
  'MATH-8033211-38':['8033211-p2.png',11,24,24,17], 'MATH-8033211-41':['8033211-p2.png',10,78,20,13],
  'MATH-8033215-33':['8033215-p1.png',8,40,26,16], 'MATH-8033215-45':['8033215-p3.png',8,54,40,11],
  'MATH-8033215-48':['8033215-p4.png',10,12,29,17], 'MATH-8033215-52':['8033215-p4.png',10,82,19,10],
  'MATH-9044418-47':['9044418-p1.png',56,58,40,13], 'MATH-9063652-32':['9063652-p1.png',8,30,39,18],
  'MATH-9063652-35':['9063652-p2.png',12,11,28,16], 'MATH-9063652-38':['9063652-p2.png',11,70,27,17],
  'MATH-8001710-MAJ-11':['8001710-MAJ-p1.png',8,59,38,12], 'MATH-8001710-MAJ-12':['8001710-MAJ-p1.png',56,14,16,10],
  'MATH-8001710-MAJ-15':['8001710-MAJ-p1.png',56,52,27,9], 'MATH-8001711-MAJ-14':['8001711-MAJ-p1.png',10,65,25,17],
  'MATH-8001711-MAJ-15':['8001711-MAJ-p1.png',56,14,15,10], 'MATH-8001711-MAJ-20':['8001711-MAJ-p1.png',57,78,18,9],
  'MATH-8001714-MAJ-13':['8001714-MAJ-p1.png',13,42,22,16], 'MATH-8001714-MAJ-14':['8001714-MAJ-p1.png',10,82,25,10],
  'MATH-8001714-MAJ-17':['8001714-MAJ-p1.png',59,43,18,11], 'MATH-8010023-MAJ-11':['8010023-MAJ-p1.png',8,16,14,10],
  'MATH-8010023-MAJ-12':['8010023-MAJ-p1.png',8,56,35,12], 'MATH-8010023-MAJ-14':['8010023-MAJ-p1.png',56,14,17,7],
  'MATH-8010023-MAJ-18':['8010023-MAJ-p1.png',59,62,13,10], 'MATH-8010025-MAJ-11':['8010025-MAJ-p1.png',9,33,14,10],
  'MATH-8010025-MAJ-16':['8010025-MAJ-p1.png',59,22,34,11], 'MATH-8010028-MAJ-16':['8010028-MAJ-p1.png',9,78,25,12],
  'MATH-8010028-MAJ-17':['8010028-MAJ-p1.png',60,36,22,16], 'MATH-8010028-MAJ-19':['8010028-MAJ-p1.png',60,78,20,12],
  'MATH-8033211-MAJ-15':['8033211-MAJ-p1.png',56,15,14,10], 'MATH-8033211-MAJ-18':['8033211-MAJ-p1.png',57,48,18,9],
  'MATH-8033213-MAJ-11':['8033213-MAJ-p1.png',8,17,14,10], 'MATH-8033213-MAJ-17':['8033213-MAJ-p1.png',58,22,35,11],
  'MATH-8033214-MAJ-15':['8033214-MAJ-p1.png',8,61,14,10], 'MATH-8033214-MAJ-19':['8033214-MAJ-p1.png',57,18,16,8],
  'MATH-8033215-MAJ-14':['8033215-MAJ-p1.png',7,48,14,10], 'MATH-8033215-MAJ-15':['8033215-MAJ-p1.png',8,78,12,10],
  'MATH-8033215-MAJ-17':['8033215-MAJ-p1.png',55,23,35,10], 'MATH-8033215-MAJ-20':['8033215-MAJ-p1.png',56,68,25,11],
  'MATH-8033216-MAJ-11':['8033216-MAJ-p1.png',8,50,35,11], 'MATH-8033216-MAJ-12':['8033216-MAJ-p1.png',10,80,12,10],
  'MATH-8033216-MAJ-13':['8033216-MAJ-p1.png',56,14,14,10], 'MATH-8033216-MAJ-14':['8033216-MAJ-p1.png',56,40,14,8],
  'MATH-9044418-MAJ-12':['9044418-MAJ-p1.png',9,22,9,7], 'MATH-9044418-MAJ-20':['9044418-MAJ-p1.png',57,58,8,9],
  'MATH-9047254-MAJ-16':['9047254-MAJ-p1.png',8,76,35,11], 'MATH-9047254-MAJ-18':['9047254-MAJ-p1.png',57,26,14,10],
  'MATH-9047254-MAJ-20':['9047254-MAJ-p1.png',58,74,16,8], 'MATH-9047256-MAJ-12':['9047256-MAJ-p1.png',8,66,17,8],
  'MATH-9047256-MAJ-13':['9047256-MAJ-p1.png',58,21,35,11], 'MATH-9047256-MAJ-14':['9047256-MAJ-p1.png',56,53,14,10],
  'MATH-9047258-MAJ-12':['9047258-MAJ-p1.png',13,34,15,10], 'MATH-9047258-MAJ-20':['9047258-MAJ-p1.png',57,27,35,11],
  'MATH-9063652-MAJ-14':['9063652-MAJ-p1.png',8,62,35,11],
}

for (const question of questions) {
  delete question.questionImageUrl
  delete question.questionImageAlt
  delete question.questionImageCrop
  const crop = crops[question.id]
  if (!crop) continue
  const [file, x, y, width, height] = crop
  question.questionImageSourceUrl = `/mock-exam-pages/${file}`
  question.questionImageUrl = `/mock-question-images/${question.id}.png`
  question.questionImageAlt = `${question.id} savoliga tegishli chizma`
  question.questionImageCrop = { x, y, width, height }
}

await fs.writeFile(dataPath, `${JSON.stringify(questions, null, 2)}\n`, 'utf8')
console.log(`Assigned exact diagram crops to ${questions.filter(question => question.questionImageCrop).length} questions.`)
