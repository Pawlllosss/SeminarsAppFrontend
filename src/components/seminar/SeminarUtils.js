import format from 'date-fns/format'

export function getHumanReadableDate(seminarDateAsString) {
    const parsedDate = new Date(seminarDateAsString);
    return format(parsedDate, 'dd-MM-yyyy iiii')
}
