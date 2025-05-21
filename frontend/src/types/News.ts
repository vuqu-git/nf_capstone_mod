export type News = {
    id: string,
    text?: string,  // ? => optional i.e. string or undefined
    image?: string, // ? => optional i.e. string or undefined
    startDate: string,
    endDate: string,
    newsVariant: string
}