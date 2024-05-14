import { debounce } from 'lodash'
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

const per = (1 / 7) * 100 + '%'
const eventWidth = 22 // px
const eventGap = 4 // px
const padding = 8

const DayEvents = (props) => {
  const { events = [], onSelect } = props
  const [showAll, setShowAll] = useState(false)
  const [overflow, setOverflow] = useState(false)
  const [visibleNumber, setVisibleNumber] = useState(0)

  const updateSizing = useCallback(() => {
    if (events.length && !showAll) {
      const length = events.length
      const parentWidth = Math.trunc(props.parentRef.current.offsetWidth)
      const paddingWidth = padding * 2
      const totalGapMax = eventGap * (length - 1)

      const isOverflow =
        paddingWidth + eventGap * totalGapMax + length * eventWidth >
        parentWidth
      setOverflow(isOverflow)

      const number = Math.trunc((parentWidth - 12) / 26)
      // console.log('================')
      // console.log('parent: ', props.parentRef.current)
      // console.log('parentWidth: ', parentWidth)
      // console.log(
      //   'num of children: Math.trunc((parentWidth - 12) / 26) = ',
      //   number
      // )
      // console.log('================')
      setVisibleNumber(number)
    }
  }, [events, props.parentRef, showAll])

  const visibleEvents = useMemo(() => {
    if (showAll) return events
    if (visibleNumber) return events.slice(0, visibleNumber)

    return []
  }, [showAll, events, visibleNumber])

  useEffect(() => {
    updateSizing()

    const debounceUpdate = debounce(updateSizing, 200)

    window.addEventListener('resize', debounceUpdate)

    return () => window.removeEventListener('resize', debounceUpdate)
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
        {visibleEvents.map((item, idx) => {
          const { title, name, id, color } = item

          return (
            <div
              className="rbc-custom-week-day-event"
              key={id + idx}
              style={{ width: eventWidth, background: color }}
              title={name}
              onClick={() => onSelect(item)}
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
