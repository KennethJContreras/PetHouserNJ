export default function Avatar({ nombre, imagen }) {
    return (
        <div className="flex items-center gap-x-2">
            <img 
                className="object-cover w-10 h-10 rounded-full" 
                src={imagen ? `/${imagen}` : '/anonymous-profile.webp'} 
                alt="Avatar" 
            />
            <div>
                <h1 className="text-xl font-semibold text-gray-400 capitalize">{nombre}</h1>
            </div>
        </div>
    )
}
