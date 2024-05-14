"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _callSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/callSuper"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _clsx = _interopRequireDefault(require("clsx"));
var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("./Header"));
var _ResourceHeader = _interopRequireDefault(require("./ResourceHeader"));
var _helpers = require("./utils/helpers");
var TimeGridHeader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(TimeGridHeader, _React$Component);
  function TimeGridHeader() {
    var _this;
    (0, _classCallCheck2.default)(this, TimeGridHeader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = (0, _callSuper2.default)(this, TimeGridHeader, [].concat(args));
    _this.handleHeaderClick = function (date, view, e) {
      e.preventDefault();
      (0, _helpers.notify)(_this.props.onDrillDown, [date, view]);
    };
    return _this;
  }
  (0, _createClass2.default)(TimeGridHeader, [{
    key: "renderHeaderCell",
    value: function renderHeaderCell(date, idx) {
      var _this2 = this;
      var _this$props = this.props,
        localizer = _this$props.localizer,
        getDrilldownView = _this$props.getDrilldownView,
        getNow = _this$props.getNow,
        dayProp = _this$props.getters.dayProp,
        _this$props$component = _this$props.components.header,
        HeaderComponent = _this$props$component === void 0 ? _Header.default : _this$props$component;
      var today = getNow();
      var drilldownView = getDrilldownView(date);
      var label = localizer.format(date, 'dayFormat');
      var _dayProp = dayProp(date),
        className = _dayProp.className,
        style = _dayProp.style;
      var header = /*#__PURE__*/_react.default.createElement(HeaderComponent, {
        date: date,
        label: label,
        localizer: localizer
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        key: idx,
        style: style,
        className: (0, _clsx.default)('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today')
      }, drilldownView ? /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "rbc-button-link",
        onClick: function onClick(e) {
          return _this2.handleHeaderClick(date, drilldownView, e);
        }
      }, header) : /*#__PURE__*/_react.default.createElement("span", null, header));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        width = _this$props2.width,
        rtl = _this$props2.rtl,
        resources = _this$props2.resources,
        range = _this$props2.range,
        accessors = _this$props2.accessors,
        scrollRef = _this$props2.scrollRef,
        isOverflowing = _this$props2.isOverflowing,
        _this$props2$componen = _this$props2.components,
        TimeGutterHeader = _this$props2$componen.timeGutterHeader,
        _this$props2$componen2 = _this$props2$componen.resourceHeader,
        ResourceHeaderComponent = _this$props2$componen2 === void 0 ? _ResourceHeader.default : _this$props2$componen2,
        localizer = _this$props2.localizer,
        getNow = _this$props2.getNow;
      var style = {};
      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] = "".concat((0, _scrollbarSize.default)() - 1, "px");
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style,
        ref: scrollRef,
        className: (0, _clsx.default)('rbc-time-header', isOverflowing && 'rbc-overflowing')
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-label rbc-time-header-gutter",
        style: {
          width: width,
          minWidth: width,
          maxWidth: width
        }
      }, TimeGutterHeader && /*#__PURE__*/_react.default.createElement(TimeGutterHeader, null)), range.map(function (date, dateIdx) {
        var today = getNow();
        var isToday = localizer.isSameDate(date, today);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rbc-time-header-content",
          key: dateIdx,
          style: {
            borderRight: '1px solid #ddd'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _clsx.default)('rbc-row rbc-time-header-cell', range.length <= 1 ? 'rbc-time-header-cell-single-day' : ''),
          style: {
            width: '100%'
          }
        }, _this3.renderHeaderCell(date, dateIdx)), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex'
          },
          className: (0, _clsx.default)(isToday ? 'rbc-today' : '')
        }, resources.map(function (_ref, resourceIdx) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            id = _ref2[0],
            resource = _ref2[1];
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "rbc-row rbc-row-resource",
            key: "resource_".concat(id !== null && id !== void 0 ? id : resourceIdx),
            style: {
              flex: 1,
              borderLeft: resourceIdx > 0 ? '1px solid #ddd' : ''
            }
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "rbc-header",
            style: {
              borderBottom: 'none'
            }
          }, /*#__PURE__*/_react.default.createElement(ResourceHeaderComponent, {
            index: resourceIdx,
            label: accessors.resourceTitle(resource),
            resource: resource
          })));
        })));
      }));
    }
  }]);
  return TimeGridHeader;
}(_react.default.Component);
var _default = exports.default = TimeGridHeader;