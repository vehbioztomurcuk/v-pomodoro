'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          if (interval) clearInterval(interval)
          if (isWork) {
            setCompletedPomodoros(prev => prev + 1)
            setMinutes(5) // 5-minute break
          } else {
            setMinutes(25) // 25-minute work session
          }
          setIsWork(!isWork)
        }
      }, 1000)
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, isWork])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
    setIsWork(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-80 border border-slate-700">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          {isWork ? 'Work' : 'Break'}
        </h1>
        <div className="text-6xl font-bold mb-8 text-center text-navy-100">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={toggleTimer} variant="outline" className="text-white border-slate-600 hover:bg-slate-700">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" className="text-white border-slate-600 hover:bg-slate-700">Reset</Button>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">Completed Pomodoros: {completedPomodoros}</p>
        </div>
      </div>
    </div>
  )
}
