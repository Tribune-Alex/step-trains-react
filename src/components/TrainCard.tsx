import type { Train } from '../types/train'

interface TrainCardProps {
    train: Train
    onAddToCart: (train: Train) => void
}


function TrainCard({ train, onAddToCart }: TrainCardProps) {
    return (
        <div className="w-80 rounded-2xl border border-[#D4AF37]/40 bg-[#19192F] p-6 shadow-lg">
            <h2>{train.name}</h2>
            <p>From: {train.from}</p>
            <p>To: {train.to}</p>
            <p>Price: ${train.price}</p>
            <button
                onClick={() => onAddToCart(train)}
                className="mt-5 w-full rounded-lg bg-[#D4AF37] px-4 py-2 font-semibold text-[#111126] hover:bg-[#E5C65C]"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default TrainCard
