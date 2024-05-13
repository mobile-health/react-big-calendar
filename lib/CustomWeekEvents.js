'use strict'

var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)
var _react = _interopRequireWildcard(require('react'))
var per = (1 / 7) * 100 + '%'
var eventWidth = 22 // px
var eventGap = 4 // px
var padding = 8
var DayEvents = function DayEvents(props) {
  var events = props.events
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    overflow = _useState2[0],
    setOverflow = _useState2[1]
  var _useState3 = (0, _react.useState)(0),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    visibleNumber = _useState4[0],
    setVisibleNumber = _useState4[1]
  var updateSizing = (0, _react.useCallback)(
    function () {
      if (events.length) {
        var length = events.length
        var parentWidth = props.parentRef.current.offsetWidth
        var paddingWidth = padding * 2
        var totalGapMax = eventGap * (length - 1)
        var isOverflow =
          paddingWidth + eventGap * totalGapMax + length * eventWidth >
          parentWidth
        setOverflow(isOverflow)
        var number = Math.floor((parentWidth - 12) / 26)
        setVisibleNumber(number)
      }
    },
    [events, props.parentRef]
  )
  ;(0, _react.useEffect)(
    function () {
      updateSizing()
    },
    [updateSizing]
  )
  if (events.length == 0) return null
  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    null,
    overflow &&
      visibleNumber < events.length &&
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'custom-show-more',
          onClick: function onClick() {
            return setVisibleNumber(events.length)
          },
        },
        '+',
        events.length - visibleNumber,
        ' more'
      ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-custom-week-day-events',
        style: {
          padding: padding,
          gap: eventGap,
        },
      },
      visibleNumber > 0 &&
        events.map(function (item, idx) {
          var title = item.title,
            name = item.name,
            id = item.id,
            color = item.color
          if (idx >= visibleNumber) return null
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-custom-week-day-event',
              key: id,
              style: {
                width: eventWidth,
                background: color,
              },
              title: name,
            },
            title
          )
        })
    )
  )
}
var CustomWeekEvents = function CustomWeekEvents(props) {
  var events = props.events,
    range = props.range,
    localizer = props.localizer
  var refs = range.map(function (_item) {
    return /*#__PURE__*/ (0, _react.createRef)()
  })
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: 'rbc-custom-week-events',
    },
    range.map(function (day, dayIdx) {
      var _events$filter
      var dayEvents =
        (_events$filter =
          events === null || events === void 0
            ? void 0
            : events.filter(function (event) {
                return localizer.isSameDate(day, event.start)
              })) !== null && _events$filter !== void 0
          ? _events$filter
          : []
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          style: {
            WebkitFlexBasis: per,
            flexBasis: per,
            maxWidth: per,
          },
          ref: refs[dayIdx],
          key: day.getTime(),
        },
        /*#__PURE__*/ _react.default.createElement(DayEvents, {
          parentRef: refs[dayIdx],
          events: dayEvents,
        })
      )
    })
  )
}
var _default = (exports.default = CustomWeekEvents)
