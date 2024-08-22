export default function PetDetail({ pet }) {
  return (
    <div class="flex lg:w-3/5 flex-col rounded-lg shadow-[2px_8px_10px_6px_#00000024] bg-white text-surface shadow-secondary-1 dark:bg-surface-dark md:flex-row m-5">
      <img
        class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-3/5 md:!rounded-none md:!rounded-s-lg"
        src={pet.url || '/bg-collage-pets.jfif'}
        alt=""
      />
      <div class="flex flex-col justify-around p-6">
        <h5 class="mb-2 text-xl font-bold ">{pet.Nombre}</h5>

        <p class="mb-4 text-base">{pet.Detalles}</p>

        <ul class="w-full">
          <li
            class="flex justify-between w-full border-b-2 border-neutral-100 border-opacity-100 py-3  dark:border-white/10">
            <p class="font-bold">Edad:</p>
            <p>{pet.Edad}</p></li>
          <li
            class="flex justify-between w-full border-b-2 border-neutral-100 border-opacity-100 py-3  dark:border-white/10">
            <p class="font-bold">Raza:</p>
            <p>{pet.Raza}</p></li>
          <li
            class="flex justify-between w-full border-b-2 border-neutral-100 border-opacity-100 py-3  dark:border-white/10">
            <p class="font-bold">Ciudad:</p>
            <p>{pet.MunicipioDescripcion}</p></li>
          <li
            class="flex justify-between w-full border-b-2 border-neutral-100 border-opacity-100 py-3  dark:border-white/10">
            <p class="font-bold">Fecha de Publicacion:</p>
            <p>{pet.FechaPublicacion.split(" ")[0]}</p></li>
          <li
            class="flex justify-between w-full border-neutral-100 border-opacity-100 py-3  dark:border-white/10">
            <p class="font-bold">Dueño:</p>
            <p>{pet.NombreCompleto}</p></li>
        </ul>
        <button class="px-6 py-2 font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-secondary rounded-lg hover:bg-secondary-light hover:animate-shake focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Ponerme en contacto
        </button>
      </div>
    </div>
  )
}