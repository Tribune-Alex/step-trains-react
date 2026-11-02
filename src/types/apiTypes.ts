export interface ApiTrain {
    id: number
    number: number
    name: string
    thumbnail: string
    coachesCount: number
    totalSeats: number
}

export interface Coach {
    id: number
    number: number
    class: string
    price: number
    trainId: number
    seatCount: number
}

export interface Station {
    id: number
    name: string
}