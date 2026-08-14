const lessonAnswers = lesson => lesson.facts || lesson.formulas || lesson.rules || lesson.points || lesson.topics || [lesson.summary]

export function generateMilestoneQuestions(lessons, total) {
  const validLessons = lessons.filter(Boolean)
  const answerPool = validLessons.flatMap(lessonAnswers).filter(Boolean)
  if (!validLessons.length || !answerPool.length) return []
  return Array.from({ length: total }, (_, index) => {
    const lesson = validLessons[index % validLessons.length]
    const answers = lessonAnswers(lesson).filter(Boolean)
    const correct = answers[index % answers.length]
    const candidates = [...new Set(answerPool.filter(answer => answer !== correct))]
    const distractors = candidates.length ? Array.from({ length: Math.min(3, candidates.length) }, (_, offset) => candidates[(index + offset) % candidates.length]) : []
    while (distractors.length < 3) distractors.push(`Bu “${lesson.title}” mavzusiga tegishli bo‘lmagan xulosa ${distractors.length + 1}`)
    const options = [correct, ...distractors]
    const shift = index % 4
    const rotated = [...options.slice(shift), ...options.slice(0, shift)]
    return {
      id: `milestone-${index + 1}`,
      topic: lesson.title,
      text: `${lesson.title} mavzusi bo‘yicha to‘g‘ri qoida yoki xulosani belgilang.`,
      options: rotated,
      answer: rotated.indexOf(correct),
      explanation: correct,
    }
  })
}
