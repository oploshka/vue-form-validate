
// style
import './style/const.scss';
import './style/custom-style.scss';


// Работа с датой
import dayjs from './dependency/library/dayjs';
global.DateTime = dayjs;

// Работа с файлами
import FileClass from './dependency/class/FileClass';
global.FileClass = FileClass;


// plugins
// import './dependency/plugin/v-mask';



const install = (app, options) => {
  // TODO: add setting support
};


export default {
  install: install
};
