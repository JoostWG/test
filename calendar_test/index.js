import dayjs from 'dayjs';
import ical from 'ical-generator';
import fs from 'node:fs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.extend(timezone);

dayjs.tz.setDefault('Europe/Amsterdam');

const calendar = ical({ name: 'Luchtalarm 2026' });

for (let m = 0; m < 12; m++) {
    let d = dayjs().year(2026).month(m).startOf('month').startOf('day').startOf('hour').startOf('minute').startOf('second');

    while (d.isoWeekday() !== 1) {
        d = d.add(1, "day");
    }

    const start = d.hour(12).minute(0).second(0);
    const end = start.add(30, 'minutes');

    console.log(start.toDate())
    calendar.createEvent({
        allDay: true,
        start: start.toDate(),
        end: end.toDate(),
        summary: 'Luchtalarm',
    });
}

fs.mkdir('build', () => { });
fs.writeFile('build/calendar.ics', calendar.toString(), () => { });
