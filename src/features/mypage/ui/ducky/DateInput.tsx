import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import clsx from "clsx"

type Props = {
    label: string
    value?: Date
    onChange?: (date: Date) => void
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]

type CalendarDay = {
    day: number
    offset: -1 | 0 | 1
}

export const DateInput = ({ label, value, onChange }: Props) => {
    const baseDate = value ?? new Date()
    const [currentMonth, setCurrentMonth] = useState(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1))

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const prevLastDate = new Date(year, month, 0).getDate()

    const days: CalendarDay[] = []

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            day: prevLastDate - i,
            offset: -1,
        })
    }

    for (let i = 1; i <= lastDate; i++) {
        days.push({
            day: i,
            offset: 0,
        })
    }

    let nextDay = 1
    while (days.length < 42) {
        days.push({
            day: nextDay++,
            offset: 1,
        })
    }

    const isSelected = (day: CalendarDay) =>
        value &&
        value.getFullYear() === new Date(year, month + day.offset, day.day).getFullYear() &&
        value.getMonth() === new Date(year, month + day.offset, day.day).getMonth() &&
        value.getDate() === day.day

    const handleClick = (day: CalendarDay) => {
        const targetDate = new Date(year, month + day.offset, day.day)

        if (day.offset !== 0) {
            setCurrentMonth(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1))
        }

        onChange?.(targetDate)
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-label-large text-neutral-800">{label}</span>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-title-small font-bold">
                        {year}년 {month + 1}월
                    </span>

                    <div className="flex gap-2">
                        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>
                            <ChevronLeft className="text-neutral-400" />
                        </button>
                        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>
                            <ChevronRight className="text-neutral-400" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 text-center text-sm text-neutral-400 mb-2">
                    {DAYS.map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center">
                    {days.map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleClick(day)}
                            className={clsx(
                                "w-10 h-10 mx-auto rounded-full transition",
                                day.offset !== 0 && "text-neutral-300 hover:text-neutral-500",
                                day.offset === 0 && "hover:bg-neutral-100",
                                isSelected(day) && "bg-cyan-400 text-white hover:bg-cyan-500"
                            )}
                        >
                            {day.day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
