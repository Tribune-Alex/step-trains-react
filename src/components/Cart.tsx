
import type { Train } from '../types/train'

interface CartProps {
    cart: Train[]
    onIncrease: (train: Train) => void
    onDecrease: (train: Train) => void
}

function Cart({ cart, onIncrease, onDecrease }: CartProps) {

    const uniqueTrains = cart.filter(
        (train, index, self) =>
            self.findIndex((item) => item.id === train.id) === index
    )

    const totalPrice = cart.reduce(
        (total, train) => total + train.price,
        0
    )

    return (
        <main className="flex-1 px-6 py-12 text-white">
            <h1 className="mb-8 text-center text-4xl font-bold text-[#D4AF37]">
                My Cart
            </h1>

            {cart.length === 0 ? (
                <p className="text-center text-slate-400">
                    Your cart is empty.
                </p>
            ) : (
                <div className="mx-auto max-w-3xl space-y-4">

                    {uniqueTrains.map((train) => {

                        const quantity = cart.filter(
                            (item) => item.id === train.id
                        ).length

                        return (
                            <div
                                key={train.id}
                                className="rounded-xl border border-[#D4AF37]/40 bg-[#19192F] p-6"
                            >
                                <h2 className="text-xl font-bold">
                                    {train.name}
                                </h2>

                                <p className="mt-2 text-slate-300">
                                    {train.from} → {train.to}
                                </p>

                                <p className="mt-2 text-[#D4AF37]">
                                    ${train.price}
                                </p>

                                <div className="mt-4 flex items-center gap-4">
                                    <button
                                        onClick={() => onDecrease(train)}
                                        className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600"
                                    >
                                        −
                                    </button>

                                    <span className="font-bold">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() => onIncrease(train)}
                                        className="rounded-lg bg-[#D4AF37] px-4 py-2 font-bold text-[#111126] hover:bg-[#E5C65C]"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="mt-3 text-sm text-slate-400">
                                    Subtotal: ${train.price * quantity}
                                </p>
                            </div>
                        )
                    })}

                </div>

            )}
            <div className="mt-8 rounded-xl border border-[#D4AF37]/50 bg-[#19192F] p-6 text-right">
                <h2 className="text-2xl font-bold text-[#D4AF37]">
                    Total: ${totalPrice}
                </h2>
            </div>
        </main>
    )
}

export default Cart
