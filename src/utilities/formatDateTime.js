export function showDateTime(createdAt) {
    const date = new Date(createdAt)
    // const userLocale = navigator.language || 'en-US' //Will do when app is multilingual
    const userLocale = 'en-US'

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: true,
    }

    const formatter = new Intl.DateTimeFormat(userLocale, options)

    return formatter.format(date)
}
