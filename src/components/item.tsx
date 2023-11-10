import Link from 'next/link';

interface ItemProps {
    title: string;
    id: number;
    text: string;
    hearts: number;
}

export default function Item({ title, text, hearts, id }: ItemProps) {
    return (
        <Link
            href={`/tweet/${id}`}
            className="flex px-4 py-4 rounded-3xl shadow-md shadow-pink-300 border border-pink-200 cursor-pointer justify-between bg-white"
        >
            <div className="flex space-x-4">
                <div className="w-3 h-14 bg-pink-400 rounded-xl" />
                <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                    <span className="font-medium w-32 truncate text-gray-900">{text}</span>
                </div>
            </div>
            <div className="flex space-x-2 items-end justify-end">
                <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                    <span>{hearts}</span>
                </div>
            </div>
        </Link>
    );
}
