import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';
import {Moment} from 'moment';

enum eDateFormat {
  Default = '',
  WallPost = 'WallPost',
  Age = 'Age'
}

// 1 минуту назад ... 59 минут назад
// час назад ... шесть часов назад
// сегодня в 14:12 ... сегодня в 00:12
// вчера в HH:mm ... вчера в HH:mm
// 23 марта 2018 ...

@Pipe({name: 'pgDate'})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date, format: eDateFormat): string {
    if (!date) {
      return '';
    }
    if (!(date instanceof Date)) {
      return '' + date;
    }

    moment.locale('ru');
    const mDate = moment(date);
    if (!mDate.isValid()) {
      return '' + date;
    }

    switch (format) {
      case eDateFormat.Default:
        return this._formatDefault(mDate);
      case eDateFormat.WallPost:
        return this._formatWallPost(mDate);
      case eDateFormat.Age:
        return this._formatAge(mDate);
      default:
        return mDate.format('HH:mm DD.MM.YYYY');
    }
  }

  private _formatAge(date: Moment): string {
    const years = moment().diff(date, 'years');
    return (years > 0) ? years.toString() : '?';
  }

  private _formatWallPost(date: Moment): string {
    const now = moment();
    const oneHour = moment().add(-1, 'hour');
    const sixHour = moment().add(-6, 'hour');
    const thisDay = moment().startOf('day');
    const yesterday = moment().startOf('day').add(-1, 'day');

    if (date.isBetween(oneHour, now)) {
      return date.fromNow();
    } else if (date.isBetween(sixHour, now)) {
      return date.fromNow();
    } else if (date.isBetween(thisDay, now)) {
      return date.format('[сегодня в] HH:mm');
    } else if (date.isBetween(yesterday, now)) {
      return date.format('[вчера в] HH:mm');
    } else {
      return date.format('DD MMM YYYY').replace('.', ''); // Не всегда default
    }
  }

  private _formatDefault(date: Moment): string {
    return date.format('DD MMM YYYY').replace('.', '');
  }

}
