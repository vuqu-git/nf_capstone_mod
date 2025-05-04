export function createDateAndTimeForAddToCalendarButton(
    screeningterminIso8601?: string, // Make the input optional
    screeningTotalDuration: number = 0, //Provide a default value in case it is undefined
) {

    if (!screeningterminIso8601) {
        return { // Return empty strings => <AddToCalendarButton /> won't display in case of these values
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
        };
    }

    const start = new Date(screeningterminIso8601);
    const end = new Date(start.getTime() + screeningTotalDuration * 60000); // 60000 ms in a minute

    const pad = (num: number) => num.toString().padStart(2, '0');

    const startDate = start.getFullYear() + '-' + pad(start.getMonth() + 1) + '-' + pad(start.getDate());
    const startTime = pad(start.getHours()) + ':' + pad(start.getMinutes());
    const endDate = end.getFullYear() + '-' + pad(end.getMonth() + 1) + '-' + pad(end.getDate());
    const endTime = pad(end.getHours()) + ':' + pad(end.getMinutes());

    return { startDate, startTime, endDate, endTime };
}
