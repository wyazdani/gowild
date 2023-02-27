// Base64 to Image
import {BASE_URL} from "../config/constants";
import moment from 'moment';

function groupedDays(messages) {
  return messages.reduce((acc, el, i) => {
    const messageDay = moment(el.createdDate).format('YYYY-MM-DD');
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
}

export function generateItems(messages) {
  const days = groupedDays(messages);
  const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
  );
  return sortedDays.reduce((acc, date) => {
    const sortedMessages = days[date].sort(
        (x, y) => new Date(y.createdDate) - new Date(x.createdDate)
    );
    return acc.concat([...sortedMessages, {type: 'day', date, id: date}]);
  }, []);
}
export function imageUrl(str, image='') {
  if (!str){
    return image;
  }
  return `${BASE_URL}${str}`
}

export function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " mins";
  }
  return Math.floor(seconds) + " seconds";
}

export function get_url_extension( url ) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}
