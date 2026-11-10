
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ApiTrain, Coach, Station } from '../types/apiTypes'

const API_URL = 'https://trainsapi.stepacademy.ge/api'

function Trains() {
    const navigate = useNavigate()

    const [trains, setTrains] = useState<ApiTrain[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [stations, setStations] = useState<Station[]>([])
    const [isStationsLoading, setIsStationsLoading] = useState(true)
    const [stationsError, setStationsError] = useState<string | null>(null)

    const [destinationStations, setDestinationStations] = useState<Station[]>([])
    const [isDestinationLoading, setIsDestinationLoading] = useState(false)

    const [coaches, setCoaches] = useState<Coach[]>([])
    const [selectedTrainId, setSelectedTrainId] = useState<number | null>(null)
    const [isCoachesLoading, setIsCoachesLoading] = useState(false)
    const [coachesError, setCoachesError] = useState<string | null>(null)

    const [searchNumber, setSearchNumber] = useState('')
    const [fromStation, setFromStation] = useState('')
    const [toStation, setToStation] = useState('')

    const searchInputRef = useRef<HTMLInputElement>(null)

    // Load trains
    useEffect(() => {
        fetch(`${API_URL}/trains?Take=10&Page=1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load trains')
                }

                return response.json()
            })
            .then((data) => {
                setTrains(data.data.items)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    // Load stations
    useEffect(() => {
        fetch(`${API_URL}/stations`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load stations')
                }

                return response.json()
            })
            .then((data) => {
                setStations(data.data)
            })
            .catch((error) => {
                setStationsError(error.message)
            })
            .finally(() => {
                setIsStationsLoading(false)
            })
    }, [])

    // Load destination stations when origin changes
    useEffect(() => {
        setToStation('')
        setDestinationStations([])

        if (!fromStation) return

        setIsDestinationLoading(true)

        fetch(`${API_URL}/stations/from/${fromStation}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load destination stations')
                }

                return response.json()
            })
            .then((data) => {
                setDestinationStations(data.data)
            })
            .catch((error) => {
                setStationsError(error.message)
            })
            .finally(() => {
                setIsDestinationLoading(false)
            })
    }, [fromStation])

    // Load coaches
    useEffect(() => {
        if (selectedTrainId === null) return

        setIsCoachesLoading(true)
        setCoachesError(null)
        setCoaches([])

        fetch(
            `${API_URL}/coaches/train/${selectedTrainId}?Take=10&Page=1`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load coaches')
                }

                return response.json()
            })
            .then((data) => {
                setCoaches(data.data.items)
            })
            .catch((error) => {
                setCoachesError(error.message)
            })
            .finally(() => {
                setIsCoachesLoading(false)
            })
    }, [selectedTrainId])

    // Search trains by number
    const handleSearch = () => {
        const query = searchNumber.trim()

        setIsLoading(true)
        setError(null)

        const url = query
            ? `${API_URL}/trains/search?query=${encodeURIComponent(query)}`
            : `${API_URL}/trains?Take=10&Page=1`

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to search trains')
                }

                return response.json()
            })
            .then((data) => {
                setTrains(data.data.items)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // Filter trains by route
    const handleApplyFilter = () => {
        const originStation = stations.find(
            (station) => station.id === Number(fromStation)
        )

        const destinationStation = destinationStations.find(
            (station) => station.id === Number(toStation)
        )

        if (!originStation) {
            setError('Please select origin station')
            return
        }

        const origin = originStation.name
            .replace(' Central Station', '')
            .replace(' Station', '')

        const params = new URLSearchParams({
            origin,
            Take: '10',
            Page: '1',
        })

        if (destinationStation) {
            const destination = destinationStation.name
                .replace(' Central Station', '')
                .replace(' Station', '')

            params.append('destination', destination)
        }

        setIsLoading(true)
        setError(null)

        fetch(`${API_URL}/trains/filter?${params.toString()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to filter trains')
                }

                return response.json()
            })
            .then((data) => {
                setTrains(data.data.items)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // Clear filters
    const handleClearFilter = () => {
        setSearchNumber('')
        setFromStation('')
        setToStation('')

        setIsLoading(true)
        setError(null)

        fetch(`${API_URL}/trains?Take=10&Page=1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load trains')
                }

                return response.json()
            })
            .then((data) => {
                setTrains(data.data.items)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <main className="min-h-screen bg-[#111126] px-4 py-10 text-white sm:px-8">

            <div className="mx-auto mb-10 max-w-7xl">
                <p className="mb-2 font-semibold uppercase tracking-widest text-yellow-500">
                    Explore
                </p>

                <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
                    Train Routes
                </h1>

                <p className="text-slate-400">
                    Find trains by name, or filter by origin and destination.
                </p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-4">

                <aside className="rounded-xl border border-slate-700 bg-[#1b1b35] p-5 lg:col-span-1">

                    <h2 className="mb-4 text-xl font-semibold">
                        Search
                    </h2>

                    <label className="mb-2 block text-sm text-slate-300">
                        Train number
                    </label>

                    <button
                        onClick={() => searchInputRef.current?.focus()}
                        className="mb-3 w-full rounded-lg border border-slate-600 px-4 py-2 text-sm text-white transition hover:bg-slate-700"
                    >
                        Focus search
                    </button>

                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchNumber}
                        onChange={(event) => setSearchNumber(event.target.value)}
                        placeholder="Enter train number..."
                        className="mb-4 w-full rounded-lg border border-slate-600 bg-[#111126] px-3 py-3 text-white outline-none focus:border-yellow-500"
                    />

                    <button
                        onClick={handleSearch}
                        className="mb-8 w-full rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                        Search
                    </button>

                    <h2 className="mb-5 text-xl font-semibold">
                        Filter by Route
                    </h2>

                    <label className="mb-2 block text-sm text-slate-300">
                        From
                    </label>

                    <select
                        value={fromStation}
                        onChange={(event) => setFromStation(event.target.value)}
                        disabled={isStationsLoading || !!stationsError}
                        className="mb-5 w-full rounded-lg border border-slate-600 bg-[#111126] px-3 py-3 text-white outline-none focus:border-yellow-500 disabled:opacity-50"
                    >
                        <option value="">
                            {isStationsLoading ? 'Loading stations...' : 'Any origin'}
                        </option>

                        {stations.map((station) => (
                            <option key={station.id} value={station.id}>
                                {station.name}
                            </option>
                        ))}
                    </select>

                    <label className="mb-2 block text-sm text-slate-300">
                        To
                    </label>

                    <select
                        value={toStation}
                        onChange={(event) => setToStation(event.target.value)}
                        disabled={!fromStation || isDestinationLoading}
                        className="mb-6 w-full rounded-lg border border-slate-600 bg-[#111126] px-3 py-3 text-white outline-none focus:border-yellow-500 disabled:opacity-50"
                    >
                        <option value="">
                            {isStationsLoading ? 'Loading stations...' : 'Any destination'}
                        </option>

                        {destinationStations.map((station) => (
                            <option key={station.id} value={station.id}>
                                {station.name}
                            </option>
                        ))}
                    </select>

                    {stationsError && (
                        <p className="mb-4 text-sm text-red-400">
                            Stations error: {stationsError}
                        </p>
                    )}

                    <button
                        onClick={handleApplyFilter}
                        disabled={isStationsLoading}
                        className="mb-3 w-full rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
                    >
                        Apply Filter
                    </button>

                    <button
                        onClick={handleClearFilter}
                        className="w-full rounded-lg border border-slate-600 px-4 py-3 text-white transition hover:bg-slate-700"
                    >
                        Clear
                    </button>
                </aside>

                <section className="lg:col-span-3">

                    <h2 className="mb-6 text-xl font-semibold">
                        {trains.length} trains found
                    </h2>

                    {isLoading && (
                        <p className="text-slate-400">
                            Loading trains...
                        </p>
                    )}

                    {error && (
                        <p className="text-red-400">
                            Error: {error}
                        </p>
                    )}

                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {trains.map((train) => (
                                <div
                                    key={train.id}
                                    className="overflow-hidden rounded-xl border border-slate-700 bg-[#1b1b35] transition hover:-translate-y-1 hover:border-yellow-500"
                                >
                                    <img
                                        src={train.thumbnail}
                                        alt={train.name}
                                        className="h-44 w-full object-cover"
                                    />

                                    <div className="p-4">

                                        <p className="mb-2 text-sm font-semibold text-yellow-500">
                                            #{train.number}
                                        </p>

                                        <h3 className="mb-4 text-lg font-bold">
                                            {train.name}
                                        </h3>

                                        <div className="mb-5 flex flex-wrap justify-between gap-2 text-sm text-slate-400">
                                            <span>
                                                Coaches: {train.coachesCount}
                                            </span>

                                            <span>
                                                {train.totalSeats} seats
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedTrainId(
                                                    selectedTrainId === train.id
                                                        ? null
                                                        : train.id
                                                )
                                            }}
                                            className="w-full rounded-lg bg-yellow-500 px-3 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                                        >
                                            {selectedTrainId === train.id
                                                ? 'Hide Coaches'
                                                : 'View Coaches'}
                                        </button>

                                        <button
                                            onClick={() => navigate(`/trains/${train.id}`)}
                                            className="mt-3 w-full rounded-lg border border-yellow-500 px-3 py-3 text-sm font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                                        >
                                            Train Details
                                        </button>

                                        {selectedTrainId === train.id && (
                                            <div className="mt-5 border-t border-slate-700 pt-4">

                                                <h3 className="mb-4 font-bold">
                                                    Coaches
                                                </h3>

                                                {isCoachesLoading && (
                                                    <p className="text-sm text-slate-400">
                                                        Loading coaches...
                                                    </p>
                                                )}

                                                {coachesError && (
                                                    <p className="text-sm text-red-400">
                                                        {coachesError}
                                                    </p>
                                                )}

                                                {!isCoachesLoading &&
                                                    !coachesError &&
                                                    coaches.map((coach) => (
                                                        <div
                                                            key={coach.id}
                                                            className="mb-3 rounded-lg bg-[#111126] p-3 text-sm"
                                                        >
                                                            <p>Coach: {coach.number}</p>
                                                            <p>Class: {coach.class}</p>
                                                            <p>Price: {coach.price}</p>
                                                            <p>Seats: {coach.seatCount}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {trains.length === 0 && (
                                <p className="col-span-full text-slate-400">
                                    No trains found.
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Trains
