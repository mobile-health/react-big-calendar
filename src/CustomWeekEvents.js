import React, { createRef, useCallback, useEffect, useState } from 'react'

const per = (1 / 7) * 100 + '%'
const eventWidth = 22 // px
const eventGap = 4 // px
const padding = 8

const DayEvents = (props) => {
  const { events, onSelect } = props
  const [showAll, setShowAll] = useState(false)
  const [overflow, setOverflow] = useState(false)
  const [visibleNumber, setVisibleNumber] = useState(0)

  const updateSizing = useCallback(() => {
    if (events.length && !showAll) {
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
  }, [events, props.parentRef, showAll])

  useEffect(() => {
    updateSizing()

    window.addEventListener('resize', updateSizing)

    return () => window.removeEventListener('resize', updateSizing)
  }, [updateSizing])

  if (events.length == 0) return null

  return (
    <>
      {overflow && visibleNumber < events.length && (
        <div
          className="custom-show-more"
          onClick={() => {
            setVisibleNumber(events.length)
            setShowAll(true)
          }}
        >
          +{events.length - visibleNumber} more
        </div>
      )}
      <div
        className="rbc-custom-week-day-events"
        style={{ padding, gap: eventGap }}
      >
        {(visibleNumber > 0 || showAll) &&
          events.map((item, idx) => {
            const { title, name, id, color } = item

            if (idx < visibleNumber || showAll)
              return (
                <div
                  className="rbc-custom-week-day-event"
                  key={id}
                  style={{ width: eventWidth, background: color }}
                  title={name}
                  onClick={() => onSelect(item)}
                >
                  {title}
                </div>
              )

            return null
          })}
      </div>
    </>
  )
}

const CustomWeekEvents = (props) => {
  const { events, range, localizer, onSelect } = props

  const refs = range.map((_item) => createRef())

  return (
    <div className="rbc-custom-week-events">
      {range.map((day, dayIdx) => {
        const dayEvents =
          events?.filter((event) => localizer.isSameDate(day, event.start)) ??
          []
        return (
          <div
            className="rbc-custom-week-day-wrapper"
            style={{ WebkitFlexBasis: per, flexBasis: per, maxWidth: per }}
            ref={refs[dayIdx]}
            key={day.getTime()}
          >
            <DayEvents
              parentRef={refs[dayIdx]}
              events={dayEvents}
              onSelect={onSelect}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CustomWeekEvents
