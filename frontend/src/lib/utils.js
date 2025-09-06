export function formatDate(date) {
    return date.toLocaleDateString('en-ca', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: "UTC",
    });
}
export function toLocalMidnight(date) {
    // const localDate = new Date(date)
    // localDate.setHours(0, 0, 0, 0);
    // return localDate
    const dayFromDate = date.day.to
    date.setUTCDate(date.day)
    return date.toLocaleDateString('en-ca', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
})
}
export function formatDueDate(date) {
    return date.toLocaleDateString("en-ca")
}

export function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}