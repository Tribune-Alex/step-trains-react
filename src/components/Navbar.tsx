
interface NavbarProps {
    activePage: string
    onPageChange: (page: string) => void
    cartCount: number
}
function Navbar({ activePage, onPageChange, cartCount }: NavbarProps) {

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-sky-400/40 bg-[#111126] px-16 py-3 text-white">
            <div className="flex items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                >
                    <rect x="5" y="2" width="14" height="17" rx="4" />
                    <path d="M5 10h14M9 6h.01M15 6h.01M8 15h8M8 22l2-3M16 22l-2-3" />
                </svg>

                <h1 className="text-lg font-bold tracking-wide">
                    <span className="text-white">STEP</span>{' '}
                    <span className="text-[#D4AF37]">TRAINS</span>
                </h1>
            </div>

            <div className="flex items-center gap-8">
                {['Home', 'Trains', 'Cart'].map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`relative py-2 text-sm font-medium text-[#D4AF37]
                after:absolute after:bottom-0 after:left-0 after:h-0.5
                after:bg-[#D4AF37] after:transition-all
                ${activePage === page ? 'after:w-full' : 'after:w-0'}`}
                    >
                        {page === 'Cart' ? `Cart (${cartCount})` : page}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-white transition hover:text-[#D4AF37]">
                    Sign in
                </button>

                <button className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#111126] transition hover:bg-[#E5C65C]">
                    GET STARTED
                </button>
            </div>
        </nav>
    )
}

export default Navbar

