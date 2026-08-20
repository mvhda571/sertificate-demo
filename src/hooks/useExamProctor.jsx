/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useExamProctor(onExit) {
  const [startOpen,setStartOpen]=useState(false); const [exitOpen,setExitOpen]=useState(false)
  const activeRef=useRef(false); const pendingStart=useRef(null)
  const askStart=useCallback(action=>{pendingStart.current=action||null;setStartOpen(true)},[])
  const confirmStart=useCallback(async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch{/* unavailable */}activeRef.current=true;setStartOpen(false);pendingStart.current?.();pendingStart.current=null},[])
  const cancelStart=useCallback(()=>{pendingStart.current=null;setStartOpen(false)},[])
  const finishExam=useCallback(async()=>{activeRef.current=false;setExitOpen(false);if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{})},[])
  const confirmExit=useCallback(async()=>{await finishExam();onExit?.()},[finishExam,onExit])
  const stayInExam=useCallback(async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch{/* keep visible */}setExitOpen(false)},[])
  useEffect(()=>{const fullscreen=()=>{if(activeRef.current&&!document.fullscreenElement)setExitOpen(true)};const visibility=()=>{if(activeRef.current&&document.hidden)setExitOpen(true)};const unload=event=>{if(activeRef.current){event.preventDefault();event.returnValue=''}};document.addEventListener('fullscreenchange',fullscreen);document.addEventListener('visibilitychange',visibility);window.addEventListener('beforeunload',unload);return()=>{document.removeEventListener('fullscreenchange',fullscreen);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('beforeunload',unload)}},[])
  return{startOpen,exitOpen,askStart,confirmStart,cancelStart,confirmExit,stayInExam,finishExam}
}

export function ExamProctorModals({proctor}){const{t}=useTranslation();return <>{proctor.startOpen&&<Modal title={t('proctor.fullscreenTitle')}><p className="text-sm leading-6 text-slate-500">{t('proctor.fullscreenMessage')}</p><div className="mt-6 flex justify-end gap-3"><button onClick={proctor.cancelStart} className="btn-secondary">{t('proctor.cancel')}</button><button onClick={proctor.confirmStart} className="btn-primary">{t('proctor.agree')}</button></div></Modal>}{proctor.exitOpen&&<Modal title={t('proctor.exitTitle')}><p className="text-sm leading-6 text-red-600">{t('proctor.exitMessage')}</p><div className="mt-6 flex justify-end gap-3"><button onClick={proctor.stayInExam} className="btn-primary">{t('proctor.stay')}</button><button onClick={proctor.confirmExit} className="btn-secondary text-red-600">{t('proctor.exit')}</button></div></Modal>}</>}
function Modal({title,children}){return <div className="fixed inset-0 z-[2000] grid place-items-center bg-slate-950/75 p-4"><div role="dialog" aria-modal="true" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"><h2 className="text-xl font-black">{title}</h2><div className="mt-3">{children}</div></div></div>}
