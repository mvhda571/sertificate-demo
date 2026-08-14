import fs from 'node:fs/promises'

const file = new URL('../src/pages/MathGradesPage.jsx', import.meta.url)
let source = await fs.readFile(file, 'utf8')

const importsFrom = "import grades from '../data/mathCurriculum.json'"
const importsTo = `${importsFrom}\nimport mathTeacherAdvice from '../data/mathTeacherAdvice6.json'\nimport { TeacherAdvice } from '../components/TeacherAdvice'`
if (!source.includes('mathTeacherAdvice6.json')) source = source.replace(importsFrom, importsTo)

const anchor = '</ol></section><div className="mt-7 flex justify-end">'
const insertion = `</ol></section>{gradeId==='6'&&<TeacherAdvice subject="matematika" lesson={{...active,teacherAdvice:mathTeacherAdvice[active.id]}}/>}<div className="mt-7 flex justify-end">`
if (!source.includes('<TeacherAdvice subject="matematika"')) {
  if (!source.includes(anchor)) throw new Error('Math advice insertion point not found')
  source = source.replace(anchor, insertion)
}

await fs.writeFile(file, source, 'utf8')
