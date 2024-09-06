import Image from 'next/image';

export default function BackButton() {
    return (
        <header className="flex items-center pt-8">
            <button>
                <Image
                    src="/images/back.png"
                    width={24}
                    height={24}
                    alt="Back icon"
                    className="filter invert"
                />
            </button>
        </header>
    );
}
