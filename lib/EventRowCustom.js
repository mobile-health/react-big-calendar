'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _callSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/callSuper')
)
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)
var _react = _interopRequireDefault(require('react'))
var _lodash = require('lodash')
var Badge = function Badge(_ref) {
  var bg = _ref.bg,
    count = _ref.count
  return /*#__PURE__*/ _react.default.createElement(
    'span',
    {
      className: 'custom-day-event-count',
      style: {
        background: bg,
      },
    },
    count
  )
}
var per = (1 / 7) * 100 + '%'
var EventRowCustom = /*#__PURE__*/ (function (_React$Component) {
  function EventRowCustom() {
    ;(0, _classCallCheck2.default)(this, EventRowCustom)
    return (0, _callSuper2.default)(this, EventRowCustom, arguments)
  }
  ;(0, _inherits2.default)(EventRowCustom, _React$Component)
  return (0, _createClass2.default)(EventRowCustom, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          events = _this$props.events,
          range = _this$props.range,
          localizer = _this$props.localizer
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-row',
          },
          range.map(function (day, key) {
            var dayEvents = events
              .map(function (item) {
                return item.event
              })
              .filter(function (event) {
                return localizer.isSameDate(event.start, day)
              })
            var groupedByColors = (0, _lodash.groupBy)(dayEvents, 'color')
            return /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                key: key,
                className: 'rbc-row-segment',
                // IE10/11 need max-width. flex-basis doesn't respect box-sizing
                style: {
                  WebkitFlexBasis: per,
                  flexBasis: per,
                  maxWidth: per,
                },
              },
              Object.keys(groupedByColors).map(function (color) {
                return /*#__PURE__*/ _react.default.createElement(Badge, {
                  key: color,
                  bg: color,
                  count: groupedByColors[color].length,
                })
              })
            )
          })
        )
      },
    },
  ])
})(_react.default.Component)
var _default = (exports.default = EventRowCustom)
