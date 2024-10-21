export function showDateTime(createdAt) {
    const date = new Date(createdAt)
    const userLocale = navigator.language || 'en-US'

    // Опции форматирования (можно добавить timeZone если нужно)
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }

    const formatter = new Intl.DateTimeFormat(userLocale, options)

    return formatter.format(date)
}
