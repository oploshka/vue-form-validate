import dayjs from 'dayjs';
require('dayjs/locale/ru');

var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc'); // dependent on utc plugin
var customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

dayjs.locale('ru');

global.DateTime = dayjs;
