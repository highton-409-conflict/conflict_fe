import { useMemo } from "react"

export interface TimelineItem {
    id: string
    label: string
    startDate: string
    endDate: string
}

interface TimelineProps {
    items: TimelineItem[]
    editMode?: boolean
    onDelete?: (id: string) => void
}

const LANE_HEIGHT = 36
const BASELINE_HEIGHT = 50

function parse(date: string) {
    return new Date(date)
}

function diffInMonths(a: Date, b: Date) {
    return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

function isOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart <= bEnd && bStart <= aEnd
}

export function Timeline({ items, editMode = false, onDelete }: TimelineProps) {
    const { minDate, maxDate, positioned, laneCount, totalMonths } = useMemo(() => {
        if (!items.length) {
            return {
                minDate: new Date(),
                maxDate: new Date(),
                positioned: [],
                laneCount: 0,
                totalMonths: 1,
            }
        }

        const parsed = items.map((i) => ({
            ...i,
            start: parse(i.startDate),
            end: parse(i.endDate),
        }))

        const minDate = new Date(Math.min(...parsed.map((i) => i.start.getTime())))
        const maxDate = new Date(Math.max(...parsed.map((i) => i.end.getTime())))

        const totalMonths = diffInMonths(minDate, maxDate) + 1

        parsed.sort((a, b) => a.start.getTime() - b.start.getTime())

        const lanes: { start: Date; end: Date }[][] = []

        const positioned = parsed.map((item) => {
            let laneIndex = 0

            for (; laneIndex < lanes.length; laneIndex++) {
                const overlap = lanes[laneIndex].some((laneItem) =>
                    isOverlap(item.start, item.end, laneItem.start, laneItem.end)
                )
                if (!overlap) break
            }

            if (!lanes[laneIndex]) lanes[laneIndex] = []
            lanes[laneIndex].push({
                start: item.start,
                end: item.end,
            })

            return { ...item, lane: laneIndex }
        })

        return {
            minDate,
            maxDate,
            positioned,
            laneCount: lanes.length,
            totalMonths,
        }
    }, [items])

    const totalHeight = laneCount * LANE_HEIGHT + BASELINE_HEIGHT

    return (
        <div className="w-full px-4">
            <div
                className="relative w-full"
                style={{
                    height: totalHeight,
                }}
            >
                {positioned.map((item) => {
                    const left = (diffInMonths(minDate, item.start) / totalMonths) * 100
                    const width = ((diffInMonths(item.start, item.end) + 1) / totalMonths) * 100
                    const top = (laneCount - 1 - item.lane) * LANE_HEIGHT

                    const isNarrow = width < 6

                    return (
                        <div
                            key={item.id}
                            className="absolute"
                            style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                top,
                            }}
                        >
                            <div
                                title={item.label}
                                className={`relative rounded-full bg-cyan-500 px-3 py-1 text-xs text-white whitespace-nowrap flex items-center
                    ${editMode ? "justify-between" : "justify-start"}
                `}
                            >
                                {(!editMode || !isNarrow) && <span className="truncate">{item.label}</span>}

                                {editMode && (
                                    <button
                                        onClick={() => onDelete?.(item.id)}
                                        className="ml-1 text-white/80 hover:text-white text-[10px] leading-none shrink-0"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}

                <div
                    className="absolute left-0 w-full h-0.5 bg-neutral-600"
                    style={{
                        top: laneCount * LANE_HEIGHT,
                    }}
                />

                {Array.from(
                    { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
                    (_, i) => minDate.getFullYear() + i
                ).map((year) => {
                    const yearStart = new Date(year, 0, 1)

                    let offset = (diffInMonths(minDate, yearStart) / totalMonths) * 100

                    offset = Math.max(0, Math.min(100, offset))

                    const baselineTop = laneCount * LANE_HEIGHT

                    return (
                        <div
                            key={year}
                            className="absolute"
                            style={{
                                left: `${offset}%`,
                                top: baselineTop,
                            }}
                        >
                            <div className="w-0.5 h-5 bg-neutral-600" />

                            <div className="absolute top-5 -translate-x-1/2 text-xs font-medium text-neutral-500">
                                {year}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
