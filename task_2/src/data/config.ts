import { CategoryEnum } from '../types';

export const NOTES = [
    {
        id:          '1231',
        title:       'Shopping list',
        category:    CategoryEnum.TASK,
        description: 'We are going to buy new car on the 05/12/2022',
        dates:       ['05/12/2022'],
        archived:    false,
        created:     new Date().toString(),
    },
    {
        id:          '1232',
        title:       'New Feature',
        category:    CategoryEnum.IDEA,
        description: 'Should try to implement something',
        dates:       [],
        archived:    false,
        created:     new Date().toString(),

    },
    {
        id:          '1233',
        title:       'Creative Ideas',
        category:    CategoryEnum.THOUGHT,
        description: 'Evaluate ideas at the end of the session',
        dates:       [],
        archived:    false,
        created:     new Date().toString(),

    },
    {
        id:          '1234',
        title:       'Order books',
        category:    CategoryEnum.TASK,
        description: 'We should order new books up to on the 20/10/2022',
        dates:       ['20/10/2022'],
        archived:    false,
        created:     new Date().toString(),
    },
    {
        id:          '1235',
        title:       'Party',
        category:    CategoryEnum.IDEA,
        description: 'Сhoose an appropriate and comfortable meeting space',
        dates:       [],
        archived:    false,
        created:     new Date().toString(),

    },
    {
        id:          '1236',
        title:       'Present the Problem',
        category:    CategoryEnum.TASK,
        description: 'Clearly define the problem that you want to solve',
        dates:       [],
        archived:    false,
        created:     new Date().toString(),
    },
    {
        id:          '1237',
        title:       'Discussion',
        category:    CategoryEnum.THOUGHT,
        description: 'Encourage everyone to contribute and to develop ideas, '
                + 'including the quietest people, and discourage anyone from criticizing ideas',
        dates:    [],
        archived: true,
        created:  new Date().toString(),
    },
];
