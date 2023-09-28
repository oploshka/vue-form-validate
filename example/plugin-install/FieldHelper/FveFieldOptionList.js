
export const GET_ACTIVE_OPTION_LIST = () => {
  return [
    { id: true, name: 'Активирован' },
    { id: false, name: 'Деактивирован' },
  ];
};

export const GET_PAGE_SIZE_OPTION_LIST = () => {
  return [
    { id: 10, name: '10', },
    { id: 25, name: '25', },
    { id: 50, name: '50', },
  ];
};

export const GET_ICON_OPTION_LIST = () => {
  return [
    { id: 1, name: 'Сплошная',   icon: require('@img/icon/line-straight.svg') },
    { id: 2, name: 'Прерывистая', icon: require('@img/icon/line-dotted.svg') }
  ];
};
