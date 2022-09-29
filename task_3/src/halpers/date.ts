import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const strToData = (str: string): string => format(new Date(str), 'dd MMM yyyy', { locale: ru });

export const extractDates = (str: string): string[] => {
    // eslint-disable-next-line no-useless-escape
    const patern = /(0?[1-9]|[12]\d|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19?\d{2}|20?\d{2}|\d{2})/g;
    const dates = str.match(patern);
    if (dates) {
        return dates;
    }

    return [];
};
