
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'


export default function Filters({ nombre, opciones, funcionSet }) {

  return (
    <Disclosure as="div" className="border-t border-gray-300 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">{nombre}</span>
          <span className="ml-6 flex items-center">
            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
            <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-6">
          {opciones.map((opcion, optionIdx) => (
            <div key={opcion.nombre} className="flex items-center">
              <input
                defaultValue={opcion.Id}
                id={opcion.Id}
                name={nombre}
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(e) => funcionSet(opcion.Id)}
              />
              <label
                htmlFor={opcion.Id}
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                {opcion.Descripcion}
              </label>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>)
}