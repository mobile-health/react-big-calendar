"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _callSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/callSuper"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _querySelectorAll = _interopRequireDefault(require("dom-helpers/querySelectorAll"));
var _BackgroundCells = _interopRequireDefault(require("./BackgroundCells"));
var DateSlotMetrics = _interopRequireWildcard(require("./utils/DateSlotMetrics"));
var _CustomWeekEvents = _interopRequireDefault(require("./CustomWeekEvents"));
var DateContentCustomRow = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DateContentCustomRow, _React$Component);
  function DateContentCustomRow() {
    var _this;
    (0, _classCallCheck2.default)(this, DateContentCustomRow);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = (0, _callSuper2.default)(this, DateContentCustomRow, [].concat(args));
    _this.handleSelectSlot = function (slot) {
      var _this$props = _this.props,
        range = _this$props.range,
        onSelectSlot = _this$props.onSelectSlot;
      onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
    };
    _this.handleShowMore = function (slot, target) {
      var _this$props2 = _this.props,
        range = _this$props2.range,
        onShowMore = _this$props2.onShowMore;
      var metrics = _this.slotMetrics(_this.props);
      var row = (0, _querySelectorAll.default)(_this.containerRef.current, '.rbc-row-bg')[0];
      var cell;
      if (row) cell = row.children[slot - 1];
      var events = metrics.getEventsForSlot(slot);
      onShowMore(events, range[slot - 1], cell, slot, target);
    };
    _this.getContainer = function () {
      var container = _this.props.container;
      return container ? container() : _this.containerRef.current;
    };
    _this.renderHeadingCell = function (date, index) {
      var _this$props3 = _this.props,
        renderHeader = _this$props3.renderHeader,
        getNow = _this$props3.getNow,
        localizer = _this$props3.localizer;
      return renderHeader({
        date: date,
        key: "header_".concat(index),
        className: (0, _clsx.default)('rbc-date-cell', localizer.isSameDate(date, getNow()) && 'rbc-now')
      });
    };
    _this.renderDummy = function () {
      var _this$props4 = _this.props,
        className = _this$props4.className,
        range = _this$props4.range,
        renderHeader = _this$props4.renderHeader,
        showAllEvents = _this$props4.showAllEvents;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className,
        ref: _this.containerRef
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.default)('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable')
      }, renderHeader && /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-row",
        ref: _this.headingRowRef
      }, range.map(_this.renderHeadingCell)), /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-row",
        ref: _this.eventRowRef
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-row-segment"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-event"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-event-content"
      }, "\xA0"))))));
    };
    _this.containerRef = /*#__PURE__*/(0, _react.createRef)();
    _this.headingRowRef = /*#__PURE__*/(0, _react.createRef)();
    _this.eventRowRef = /*#__PURE__*/(0, _react.createRef)();
    _this.slotMetrics = DateSlotMetrics.getSlotMetrics();
    return _this;
  }
  (0, _createClass2.default)(DateContentCustomRow, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        date = _this$props5.date,
        rtl = _this$props5.rtl,
        range = _this$props5.range,
        className = _this$props5.className,
        selectable = _this$props5.selectable,
        getters = _this$props5.getters,
        components = _this$props5.components,
        getNow = _this$props5.getNow,
        renderHeader = _this$props5.renderHeader,
        localizer = _this$props5.localizer,
        onSelect = _this$props5.onSelect,
        onSelectStart = _this$props5.onSelectStart,
        onSelectEnd = _this$props5.onSelectEnd,
        resourceId = _this$props5.resourceId,
        longPressThreshold = _this$props5.longPressThreshold,
        showAllEvents = _this$props5.showAllEvents,
        events = _this$props5.events;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className,
        role: "rowgroup",
        ref: this.containerRef
      }, /*#__PURE__*/_react.default.createElement(_BackgroundCells.default, {
        localizer: localizer,
        date: date,
        getNow: getNow,
        rtl: rtl,
        range: range,
        selectable: selectable,
        container: this.getContainer,
        getters: getters,
        onSelectStart: onSelectStart,
        onSelectEnd: onSelectEnd,
        onSelectSlot: this.handleSelectSlot,
        components: components,
        longPressThreshold: longPressThreshold,
        resourceId: resourceId
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.default)('rbc-row-content', showAllEvents && 'rbc-row-content-scrollable'),
        role: "row"
      }, renderHeader && /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-row ",
        ref: this.headingRowRef
      }, range.map(this.renderHeadingCell)), /*#__PURE__*/_react.default.createElement(_CustomWeekEvents.default, {
        events: events,
        range: range,
        localizer: localizer,
        onSelect: onSelect
      })));
    }
  }]);
  return DateContentCustomRow;
}(_react.default.Component);
DateContentCustomRow.defaultProps = {
  minRows: 0
};
var _default = exports.default = DateContentCustomRow;