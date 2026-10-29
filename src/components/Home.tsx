import { trains } from '../data/trains'
import TrainCard from './TrainCard'
import type { Train } from '../types/train'



interface HomeProps {
    onAddToCart: (train: Train) => void
}

function Home({ onAddToCart }: HomeProps) {
    return (
        <main className="px-6 py-16 text-center text-white">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="mb-5 inline-block rounded-2xl border border-[#D4AF37]/50 px-8 py-1 text-[10px] tracking-wide text-[#DCC7A1] md:text-xs">
                    STEP TRAINS
                </span>
                <br />
                Travel Smarter,
                <br />
                <span className="text-[#D4AF37]">Journey Farther</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
                Search thousands of train routes and book your seats in seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
                {trains.map((train) => (
                    <TrainCard key={train.id} train={train} onAddToCart={onAddToCart} />
                ))}
            </div>
            
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-end gap-4 rounded-2xl border border-slate-700 bg-[#19192F] p-5 shadow-xl md:flex-row">
                <div className="w-full flex-1 text-left">
                    <label className="mb-2 block text-sm font-semibold text-[#DCC7A1]">
                        From
                    </label>
                    <select
                        defaultValue=""
                        className="w-full rounded-lg border border-slate-600 bg-[#111126] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
                    >
                        <option value="" disabled>
                            Select departure station
                        </option>
                        <option>Tbilisi Central</option>
                        <option>Batumi Central</option>
                        <option>Kutaisi</option>
                    </select>
                </div>

                <div className="w-full flex-1 text-left">
                    <label className="mb-2 block text-sm font-semibold text-[#DCC7A1]">
                        To
                    </label>
                    <select
                        defaultValue=""
                        className="w-full rounded-lg border border-slate-600 bg-[#111126] px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
                    >
                        <option value="" disabled>
                            Select destination
                        </option>
                        <option>Tbilisi Central</option>
                        <option>Batumi Central</option>
                        <option>Kutaisi</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="w-full rounded-lg bg-[#D4AF37] px-7 py-3 font-bold text-[#111126] transition hover:bg-[#E5C65C] md:w-auto"
                >
                    Search
                </button>
            </div>


            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-700 bg-[#19192F] p-6 text-left transition hover:border-[#D4AF37]/60">
                    <div className="mb-4 text-3xl text-[#D4AF37]">♛</div>
                    <h3 className="mb-2 text-lg font-bold">Multiple Classes</h3>
                    <p className="text-sm leading-6 text-slate-300">
                        Choose from First, Business, or Second class coaches on every train.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-[#19192F] p-6 text-left transition hover:border-[#D4AF37]/60">
                    <div className="mb-4 text-3xl text-[#D4AF37]">▦</div>
                    <h3 className="mb-2 text-lg font-bold">Flexible Dates</h3>
                    <p className="text-sm leading-6 text-slate-300">
                        Pick any future travel date when booking — change it anytime before departure.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-[#19192F] p-6 text-left transition hover:border-[#D4AF37]/60">
                    <div className="mb-4 text-3xl text-[#D4AF37]">▤</div>
                    <h3 className="mb-2 text-lg font-bold">Choose Your Seat</h3>
                    <p className="text-sm leading-6 text-slate-300">
                        Pick the exact seat you want from a live map of available seats.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-[#19192F] p-6 text-left transition hover:border-[#D4AF37]/60">
                    <div className="mb-4 text-3xl text-[#D4AF37]">✓</div>
                    <h3 className="mb-2 text-lg font-bold">Instant Confirmation</h3>
                    <p className="text-sm leading-6 text-slate-300">
                        Your booking is confirmed immediately. View and manage all trips in your profile.
                    </p>
                </div>
            </div>



            <section className="mx-auto mt-28 mb-12 w-full max-w-4xl rounded-3xl border border-[#D4AF37]/40 bg-[#19192F] px-8 py-12 text-center shadow-xl md:px-12">

                <h2 className="text-3xl font-bold md:text-4xl">
                    Ready to book your <span className="text-[#D4AF37]">journey?</span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                    Browse all available trains and schedules, then choose your seat.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                        href="https://trains.stepacademy.ge/trains"
                        className="rounded-lg bg-[#D4AF37] px-6 py-3 font-bold text-[#111126] transition hover:bg-[#E5C65C]"
                    >
                        Browse Trains
                    </a>

                    <a
                        href="https://trains.stepacademy.ge/auth/register"
                        className="rounded-lg border border-[#D4AF37] px-6 py-3 font-semibold text-[#DCC7A1] transition hover:bg-[#D4AF37]/10"
                    >
                        Create Account
                    </a>
                </div>
            </section>


        </main>
    )
}

export default Home
