'use client';

import ActionCard from '@/components/ActionCard';

export default function Page() {
    const actions = [
        {
            titulo: "Ver Mascotas",
            href: "/mascotas",
            descripcion: "Mira tus mascotas registradas",
            imagen: "/pets-card.jpg"
        },
        {
            titulo: "Dar en adopción",
            href: "/mascotas/form",
            descripcion: "Registra tu mascota",
            imagen: "/adopt-card.webp"
        },
        {
            titulo: "Publicar Historia",
            href: "/historias/form",
            descripcion: "Comparte un momento de vida",
            imagen: "/story-card.webp"
        }
    ];

    return (
        <div className="flex justify-center items-center gap-10 mt-20 flex-wrap">
            {actions.map((action) => (
                <ActionCard 
                    key={action.href} 
                    titulo={action.titulo} 
                    href={action.href} 
                    descripcion={action.descripcion} 
                    imagen={action.imagen} 
                />
            ))}
        </div>
    );
}
