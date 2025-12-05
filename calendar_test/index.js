import dayjs from 'dayjs';
import ical, { ICalCalendarMethod } from 'ical-generator';
import fs from 'node:fs';

const calendar = ical({ name: 'Epic calendar' });

const now = dayjs();

calendar.createEvent({
    start: now.toDate(),
    end: now.add(1, 'day').toDate(),
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room',
    url: 'http://google.com/',
});

fs.writeFile('./calendar.ics', calendar.toString(), () => { });
