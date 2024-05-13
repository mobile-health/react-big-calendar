import React, { createRef, useCallback, useEffect, useState } from 'react'

const per = (1 / 7) * 100 + '%'
const eventWidth = 22 // px
const eventGap = 4 // px
const padding = 8

const DayEvents = (props) => {
  const { events } = props
  const [overflow, setOverflow] = useState(false)
  const [visibleNumber, setVisibleNumber] = useState(0)

  const updateSizing = useCallback(() => {
    if (events.length) {
      const length = events.length
      const parentWidth = props.parentRef.current.offsetWidth
      const paddingWidth = padding * 2
      const totalGapMax = eventGap * (length - 1)

      const isOverflow =
        paddingWidth + eventGap * totalGapMax + length * eventWidth >
        parentWidth
      setOverflow(isOverflow)

      const number = Math.floor((parentWidth - 12) / 26)
      setVisibleNumber(number)
    }
  }, [events, props.parentRef])

  useEffect(() => {
    updateSizing()
  }, [updateSizing])

  if (events.length == 0) return null

  return (
    <>
      {overflow && visibleNumber < events.length && (
        <div
          className="custom-show-more"
          onClick={() => setVisibleNumber(events.length)}
        >
          +{events.length - visibleNumber} more
        </div>
      )}
      <div
        className="rbc-custom-week-day-events"
        style={{ padding, gap: eventGap }}
      >
        {visibleNumber > 0 &&
          Array.from(Array(visibleNumber).keys()).map((idx) => {
            const title = events[idx].title
            const color = events[idx].color
            const name = events[idx].name
            const id = events[idx].id
            return (
              <div
                className="rbc-custom-week-day-event"
                key={id}
                style={{ width: eventWidth, background: color }}
                title={name}
              >
                {title}
              </div>
            )
          })}
      </div>
    </>
  )
}

const CustomWeekEvents = (props) => {
  const { events, range, localizer } = props

  const refs = range.map((_item) => createRef())

  return (
    <div className="rbc-custom-week-events">
      {range.map((day, dayIdx) => {
        const dayEvents =
          events?.filter((event) => localizer.isSameDate(day, event.start)) ??
          []
        return (
          <div
            style={{ WebkitFlexBasis: per, flexBasis: per, maxWidth: per }}
            ref={refs[dayIdx]}
            key={day.getTime()}
          >
            <DayEvents parentRef={refs[dayIdx]} events={dayEvents} />
          </div>
        )
      })}
    </div>
  )
}

export default CustomWeekEvents
