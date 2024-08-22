import Link from "next/link";

export default function ActionCard({ titulo, descripcion, href, imagen }) {
    return (
        <Link href={href}>
            <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-105 cursor-pointer">
                <img className="object-cover w-full h-56" src={imagen} alt={titulo} />

                <div className="py-5 text-center">
                    <h2 className="block text-xl font-bold text-gray-800 dark:text-white">{titulo}</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-200">{descripcion}</p>
                </div>
            </div>
        </Link>
    );
}
