
import { NavLink } from 'react-router-dom'

interface NavbarProps {
    cartCount: number
}

function Navbar({ cartCount }: NavbarProps) {
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Trains', path: '/trains' },
        { name: 'Cart', path: '/cart' },
    ]

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-sky-400/40 bg-[#111126] px-16 py-3 text-white">

            <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold tracking-wide">
                    <span className="text-white">STEP</span>{' '}
                    <span className="text-[#D4AF37]">TRAINS</span>
                </h1>
            </div>

            <div className="flex items-center gap-8">
                {pages.map((page) => (
                    <NavLink
                        key={page.path}
                        to={page.path}
                        end={page.path === '/'}
                        className={({ isActive }) =>
                            `relative py-2 text-sm font-medium text-[#D4AF37]
                            after:absolute after:bottom-0 after:left-0 after:h-0.5
                            after:bg-[#D4AF37] after:transition-all
                            ${isActive ? 'after:w-full' : 'after:w-0'}`
                        }
                    >
                        {page.name === 'Cart'
                            ? `Cart (${cartCount})`
                            : page.name}
                    </NavLink>
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
