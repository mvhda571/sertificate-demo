import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const questionsPath = fileURLToPath(new URL('../src/data/mathMockQuestions.json', import.meta.url))
const json = (res, status, value) => { res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' }); res.end(JSON.stringify(value)) }
const body = req => new Promise((resolve, reject) => { let value = ''; req.on('data', chunk => { value += chunk; if (value.length > 1e6) reject(new Error('Payload too large')) }); req.on('end', () => { try { resolve(JSON.parse(value || '{}')) } catch (error) { reject(error) } }) })
const certificateLevel = percent => {
  if (percent >= 86) return percent >= 93 ? 'A+' : 'A'
  if (percent >= 70) return percent >= 78 ? 'B+' : 'B'
  if (percent >= 55) return percent >= 62 ? 'C+' : 'C'
  return 'O‘tmadi'
}

createServer(async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost')
  const allQuestions = JSON.parse(await readFile(questionsPath, 'utf8'))
  const activeQuestions = allQuestions.filter(question => !question.isSourceError && Number.isInteger(question.correctOption))
  const variantId = requestUrl.searchParams.get('variantId')
  const examId = requestUrl.searchParams.get('examId')
  const questions = examId
    ? activeQuestions.filter(question => (question.examId || question.variantId) === examId)
    : variantId ? activeQuestions.filter(question => question.variantId === variantId) : activeQuestions
  if (req.method === 'GET' && requestUrl.pathname === '/api/mock-tests/math-2025') {
    return json(res, 200, questions.map(({ correctOption, ...question }) => question))
  }
  if (req.method === 'GET' && requestUrl.pathname === '/api/mock-tests/math-2025/source-errors') {
    return json(res, 200, allQuestions.filter(question => question.isSourceError))
  }
  if (req.method === 'POST' && requestUrl.pathname === '/api/mock-tests/math-2025/submit') {
    try {
      const { answers = {} } = await body(req)
      const details = questions.map(question => ({ id: question.id, selectedOption: answers[question.id] ?? null, correctOption: question.correctOption, correct: answers[question.id] === question.correctOption }))
      const correct = details.filter(item => item.correct).length
      const percent = Math.round(correct / questions.length * 100)
      return json(res, 200, { correct, wrong: questions.length - correct, total: questions.length, percent, certificateLevel: certificateLevel(percent), details })
    } catch (error) { return json(res, 400, { error: error.message }) }
  }
  return json(res, 404, { error: 'Not found' })
}).listen(Number(process.env.PORT || 8787), () => console.log('Mock API: http://localhost:8787'))
