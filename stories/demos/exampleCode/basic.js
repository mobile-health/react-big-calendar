import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import {
  BackgroundEvents,
  MonthEvents,
  RandomResourceEvents,
  ResourceMap,
} from '../../resources/mock'

import MonthCustomView from '../../../src/MonthCustomView'

const mLocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const views = {
  month: MonthCustomView,
  day: true,
  week: true,
  agenda: false,
  work_week: false,
}

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  )

  return (
    <Fragment>
      {showDemoLink ? <DemoLink fileName="basic" /> : null}
      <div className="height600" {...props}>
        <Calendar
          defaultDate={defaultDate}
          events={MonthEvents}
          backgroundEvents={[]}
          resources={[]}
          localizer={localizer}
          showMultiDayTimes
          step={60}
          defaultView="month"
          views={views}
          resourceIdAccessor={'resourceId'}
          resourceTitleAccessor={'resourceTitle'}
        />
      </div>
    </Fragment>
  )
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
}
