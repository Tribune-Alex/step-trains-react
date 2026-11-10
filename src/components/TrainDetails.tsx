
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ApiTrain, Coach } from '../types/apiTypes'

const API_URL = 'https://trainsapi.stepacademy.ge/api'

function TrainDetails() {
    const { id } = useParams<{ id: string }>()

    const [train, setTrain] = useState<ApiTrain | null>(null)
    const [coaches, setCoaches] = useState<Coach[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            setError('Invalid train ID')
            setIsLoading(false)
            return
        }

        const controller = new AbortController()

        const loadTrainDetails = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const [trainResponse, coachesResponse] = await Promise.all([
                    fetch(`${API_URL}/trains/${id}`, {
                        signal: controller.signal,
                    }),
                    fetch(
                        `${API_URL}/coaches/train/${id}?Take=10&Page=1`,
                        { signal: controller.signal }
                    ),
                ])

                if (!trainResponse.ok) {
                    throw new Error('Failed to load train details')
                }

                if (!coachesResponse.ok) {
                    throw new Error('Failed to load coaches')
                }

                const trainData = await trainResponse.json()
                const coachesData = await coachesResponse.json()

                setTrain(trainData.data)
                setCoaches(coachesData.data.items)
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    setError(error.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        loadTrainDetails()

        return () => {
            controller.abort()
        }
    }, [id])

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#111126] px-8 py-16 text-white">
                <p className="text-slate-400">Loading train details...</p>
            </main>
        )
    }

    if (error || !train) {
        return (
            <main className="min-h-screen bg-[#111126] px-8 py-16 text-white">
                <p className="mb-6 text-red-400">
                    {error || 'Train not found'}
                </p>

                <Link
                    to="/trains"
                    className="text-yellow-500 hover:text-yellow-400"
                >
                    ← Back to Trains
                </Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#111126] px-4 py-10 text-white sm:px-8">

            <div className="mx-auto max-w-6xl">

                <Link
                    to="/trains"
                    className="mb-8 inline-block text-sm text-yellow-500 transition hover:text-yellow-400"
                >
                    ← Back to Trains
                </Link>

                <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#1b1b35]">

                    <img
                        src={train.thumbnail}
                        alt={train.name}
                        className="h-64 w-full object-cover sm:h-96"
                    />

                    <div className="p-6 sm:p-8">

                        <p className="mb-3 font-semibold text-yellow-500">
                            TRAIN #{train.number}
                        </p>

                        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">
                            {train.name}
                        </h1>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="rounded-xl bg-[#111126] p-5">
                                <p className="mb-2 text-sm text-slate-400">
                                    Total Coaches
                                </p>

                                <p className="text-2xl font-bold text-yellow-500">
                                    {train.coachesCount}
                                </p>
                            </div>

                            <div className="rounded-xl bg-[#111126] p-5">
                                <p className="mb-2 text-sm text-slate-400">
                                    Total Seats
                                </p>

                                <p className="text-2xl font-bold text-yellow-500">
                                    {train.totalSeats}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <section className="mt-12">

                    <h2 className="mb-6 text-2xl font-bold">
                        Available Coaches
                    </h2>

                    {coaches.length === 0 ? (
                        <p className="text-slate-400">
                            No coaches found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {coaches.map((coach) => (
                                <div
                                    key={coach.id}
                                    className="rounded-xl border border-slate-700 bg-[#1b1b35] p-5 transition hover:border-yellow-500"
                                >
                                    <h3 className="mb-4 text-xl font-bold text-yellow-500">
                                        Coach #{coach.number}
                                    </h3>

                                    <div className="space-y-3 text-sm text-slate-300">

                                        <p>
                                            Class: {coach.class}
                                        </p>

                                        <p>
                                            Price: {coach.price} GEL
                                        </p>

                                        <p>
                                            Available seats: {coach.seatCount}
                                        </p>

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </section>

            </div>
        </main>
    )
}

export default TrainDetails
