export type News = {
    id: string,
    text?: string,  // ? i.e. string or undefined
    image?: string, // ? i.e. string or undefined
    startDate: string,
    endDate: string,
    newsVariant: string
}