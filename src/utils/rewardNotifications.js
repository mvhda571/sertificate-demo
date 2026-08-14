import { toast } from 'sonner'

const options = { duration: 3800 }

export const notifyLessonXp = (xp = 100) => {
  toast.success(`+${xp} XP qo‘shildi! 🎯`, {
    ...options,
    id: 'lesson-xp',
    description: 'Dars muvaffaqiyatli yakunlandi.',
  })
}

export const notifyStreak = (days) => {
  toast.success(`Tabriklaymiz! ${days} kunlik Streak berildi! 🔥`, {
    ...options,
    id: 'daily-streak',
    description: 'Bugungi o‘quv maqsadingiz bajarildi.',
  })
}

export const notifyTestReward = (percent, xp) => {
  toast.success(`Test natijasi: ${percent}/100! Sizga +${xp} XP taqdim etildi! 🏆`, {
    ...options,
    description: 'Natija va XP balansingiz saqlandi.',
  })
}
