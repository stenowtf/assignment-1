import moment from 'moment';

// OS/App data

const AppOS = [
  'iOS',
  'Android',
];

const AppVersions = [
  ['1.0', '1.1', '2.0', '3.0', '3.1', '3.2', '3.3' ],
  ['1.0', '2.0', '2.1', '2.2', '2.3', '3.0', '3.1' ],
];

// Randoms and misc

const randomNumber = (to, from) => {
  return Math.floor(Math.random() * (to - from) + from);
};

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export default {
  getTime: () => {
    return moment().format('HH:mm:ss MM/DD/YYYY');
  },
  getRandomTime: () => {
    return moment.unix(randomNumber(moment().unix(), moment(new Date(2017, 4, 22)).unix())).format('HH:mm:ss MM/DD/YYYY');
  },
  getRandomOS: () => {
    const rand = Math.floor(Math.random() * AppOS.length);
    return [rand, AppOS[rand]];
  },
  getRandomAppVersion: (os) => {
    const rand = Math.floor(Math.random() * AppVersions[os].length);
    return [rand, AppVersions[os][rand]];
  },
  getRandomKey: () => {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  },
  getRandomLatitude: () => {
    return getRandomInRange(-180, 180, 7);
  },
  getRandomLongitude: () => {
    return getRandomInRange(-90, 90, 7);
  },
};
