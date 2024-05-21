import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'

import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'

class TimeGridHeader extends React.Component {
  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderCell(date, idx) {
    let {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props

    const today = getNow()
    let drilldownView = getDrilldownView(date)
    let label = localizer.format(date, 'dayFormat')

    const { className, style } = dayProp(date)

    let header = (
      <HeaderComponent date={date} label={label} localizer={localizer} />
    )
    return (
      <div
        key={idx}
        style={style}
        className={clsx(
          'rbc-header',
          className,
          localizer.isSameDate(date, today) && 'rbc-today'
        )}
      >
        {drilldownView ? (
          <button
            type="button"
            className="rbc-button-link"
            onClick={(e) => this.handleHeaderClick(date, drilldownView, e)}
          >
            {header}
          </button>
        ) : (
          <span>{header}</span>
        )}
      </div>
    )
  }

  render() {
    let {
      width,
      rtl,
      resources,
      range,
      accessors,
      scrollRef,
      isOverflowing,
      components: {
        timeGutterHeader: TimeGutterHeader,
        resourceHeader: ResourceHeaderComponent = ResourceHeader,
      },
      localizer,
      getNow,
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize() - 1}px`
    }

    return (
      <div
        style={style}
        ref={scrollRef}
        className={clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')}
      >
        <div
          className="rbc-label rbc-time-header-gutter"
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>

        {range.map((date, dateIdx) => {
          const today = getNow()
          const isToday = localizer.isSameDate(date, today)
          return (
            <div
              className="rbc-time-header-content"
              key={dateIdx}
              style={{ borderRight: '1px solid #ddd' }}
            >
              <div
                className={clsx(
                  'rbc-row rbc-time-header-cell',
                  range.length <= 1 ? 'rbc-time-header-cell-single-day' : ''
                )}
                style={{
                  width: '100%',
                }}
              >
                {this.renderHeaderCell(date, dateIdx)}
              </div>
              <div
                style={{ display: 'flex' }}
                className={clsx(isToday ? 'rbc-today' : '')}
              >
                {resources.map(([id, resource], resourceIdx) => (
                  <div
                    className="rbc-row rbc-row-resource"
                    key={`resource_${id ?? resourceIdx}`}
                    style={{
                      flex: 1,
                      borderLeft: resourceIdx > 0 ? '1px solid #ddd' : '',
                    }}
                  >
                    <div
                      className="rbc-header"
                      style={{ borderBottom: 'none' }}
                    >
                      <ResourceHeaderComponent
                        dateIdx={dateIdx}
                        index={resourceIdx}
                        label={accessors.resourceTitle(resource)}
                        resource={resource}
                        date={date}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  allDayMaxRows: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  onShowMore: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
}

export default TimeGridHeader
