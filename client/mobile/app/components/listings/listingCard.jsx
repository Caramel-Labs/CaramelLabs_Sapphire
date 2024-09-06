'use client';

export default function ListingCard({ props }) {
    const href = props.openHours
        ? `/location/${props._id}`
        : props.duration
        ? `/experience/${props._id}`
        : `/hotel/${props._id}`;

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative mx-4 mb-6">
            <a href={href}>
                <img
                    className="w-full h-52 object-cover"
                    src="/images/headerImg.png"
                    alt={props.name || 'Location Image'}
                />
                {/* Description section below the image */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-xs font-semibold text-black">
                            {props.name}
                        </h5>
                        <span className="text-sm text-gray-500 flex items-center">
                            {props.rating} ⭐
                        </span>
                    </div>
                    <p className="text-xs text-black mb-2">
                        4 hours from Colombo
                    </p>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs font-semibold text-black">
                                ${props.cost}
                            </span>
                            <span className="text-xs text-black ml-1">
                                upwards
                            </span>
                        </div>
                    </div>
                </div>
                <button className="absolute top-2 right-2 text-blue-500">
                    {/* Add your heart icon here */}
                </button>
            </a>
        </div>
    );
}
