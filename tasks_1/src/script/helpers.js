export const extractDates = srt => {
    const patern = /(0?[1-9]|[12]\d|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19?\d{2}|20?\d{2}|\d{2})/g;
    const dates = srt.match(patern);
    if(!!dates) {
        return dates;
    }
    return [];
};

export const dateFormat = date => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
};
