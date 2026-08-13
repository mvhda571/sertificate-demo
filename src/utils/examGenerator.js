import { historyGrades as history } from '../data/historyCurriculum.js'
import math from '../data/mathCurriculum.json'
import uzbek from '../data/uzbekCurriculum.json'
import literature from '../data/literatureCurriculum.json'

export const examSubjects = [
  { id: 'tarix', title: 'O‘zbekiston tarixi', color: 'orange' },
  { id: 'matematika', title: 'Matematika', color: 'blue' },
  { id: 'ona-tili', title: 'Ona tili', color: 'violet' },
  { id: 'adabiyot', title: 'Adabiyot', color: 'rose' },
]

const shuffle = values => {
  const result = [...values]
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

const historyLessons = Object.entries(history).flatMap(([grade, data]) => data.lessons.map(lesson => ({ ...lesson, grade })))
const jsonLessons = data => Object.entries(data).flatMap(([grade, value]) => (value.lessons || []).map(lesson => ({ ...lesson, grade })))

const pools = {
  tarix: historyLessons,
  matematika: jsonLessons(math),
  'ona-tili': jsonLessons(uzbek),
  adabiyot: jsonLessons(literature),
}

const lessonFact = lesson => lesson.facts?.[0] || lesson.formulas?.[0] || lesson.points?.[0] || lesson.rules?.[0] || lesson.summary
const distractorFacts = (lessons, lesson) => shuffle(lessons.filter(item => item !== lesson).map(lessonFact).filter(Boolean)).slice(0, 3)

function createQuestion(subject, lessons, lesson, difficulty, index) {
  const answerText = lessonFact(lesson)
  const variants = shuffle([answerText, ...distractorFacts(lessons, lesson)])
  const prompts = {
    easy: `${lesson.grade}-sinf, “${lesson.title}” mavzusiga tegishli asosiy qoida yoki faktni toping.`,
    medium: `“${lesson.title}” mavzusini amalda to‘g‘ri qo‘llaydigan xulosani belgilang.`,
    hard: `${lesson.grade}-sinfdagi “${lesson.title}” mavzusini boshqa o‘tilgan mavzular bilan bog‘lab, eng asosli javobni aniqlang.`,
  }
  return {
    id: `${subject}-${Date.now()}-${index}`,
    text: prompts[difficulty], options: variants, answer: variants.indexOf(answerText),
    difficulty, topic: lesson.title, grade: lesson.grade,
    explanation: `${answerText} Bu javob darsdagi asosiy qoida yoki faktga bevosita mos keladi.`,
  }
}

export function generateExam(subject, total = 20) {
  const lessons = pools[subject] || []
  const counts = { easy: Math.round(total * .2), medium: Math.round(total * .5) }
  counts.hard = total - counts.easy - counts.medium
  const selected = shuffle(lessons).slice(0, total)
  const difficulties = shuffle([
    ...Array(counts.easy).fill('easy'),
    ...Array(counts.medium).fill('medium'),
    ...Array(counts.hard).fill('hard'),
  ])
  return selected.map((lesson, index) => createQuestion(subject, lessons, lesson, difficulties[index], index))
}
