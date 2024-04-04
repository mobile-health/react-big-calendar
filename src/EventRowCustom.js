import React from 'react'
import { groupBy } from 'lodash'
const Badge = ({ bg, count }) => {
  return (
    <span
      className="custom-day-event-count"
      style={{
        background: bg,
      }}
    >
      {count}
    </span>
  )
}

let per = (1 / 7) * 100 + '%'

class EventRowCustom extends React.Component {
  render() {
    let { events, range, localizer } = this.props

    return (
      <div className="rbc-row">
        {range.map((day, key) => {
          const dayEvents = events
            .map((item) => item.event)
            .filter((event) => {
              return localizer.isSameDate(event.start, day)
            })
          const groupedByColors = groupBy(dayEvents, 'color')

          return (
            <div
              key={key}
              className="rbc-row-segment"
              // IE10/11 need max-width. flex-basis doesn't respect box-sizing
              style={{
                WebkitFlexBasis: per,
                flexBasis: per,
                maxWidth: per,
              }}
            >
              {Object.keys(groupedByColors).map((color) => (
                <Badge bg={color} count={groupedByColors[color].length} />
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

export default EventRowCustom
