import dayjs from 'dayjs';
import ical from 'ical-generator';
import fs from 'node:fs';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);

const calendar = ical({ name: 'Epic calendar' });



for (let m = 0; m < 12; m++) {
    let d = dayjs().year(2026).month(m).startOf('month');

    while (d.isoWeekday() !== 1) {
        d = d.add(1, "day");
    }

    const start = d.hour(12).minute(0).second(0);
    const end = start.add(30, 'minutes');

    calendar.createEvent({
        start: start.toDate(),
        end: end.toDate(),
        summary: 'Luchtalarm',
        // description: 'It works ;)',
        // location: 'my room',
        // url: 'http://google.com/',
    });
}

// calendar.createEvent({
//     start: now.toDate(),
//     end: now.add(1, 'day').toDate(),
//     summary: 'Example Event',
//     description: 'It works ;)',
//     location: 'my room',
//     url: 'http://google.com/',
// });

fs.writeFile('./build/calendar-2026-2.ics', calendar.toString(), () => { });
