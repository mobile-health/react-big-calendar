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
  RandomResourceEvents,
  ResourceMap,
} from '../../resources/mock'

const mLocalizer = momentLocalizer(moment)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  return (
    <Fragment>
      {showDemoLink ? <DemoLink fileName="basic" /> : null}
      <div className="height600" {...props}>
        <Calendar
          defaultDate={defaultDate}
          events={RandomResourceEvents}
          backgroundEvents={BackgroundEvents}
          resources={ResourceMap}
          localizer={localizer}
          showMultiDayTimes
          step={60}
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
