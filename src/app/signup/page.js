'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { SignUpFormValidator } from "@/utils/forms";
import { Register } from "@/services/users";
import ErrorListNotification from "@/components/ErrorListNotification";
import SuccessNotification from "@/components/SuccessNotification";
import { getSubscriptions } from "@/services/subscriptions";

import { getDepartments, getMunicipios } from "@/services/locations";

export default function Page() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdayDate, setBirthdayDate] = useState('')
  const [warningMessage, setWarningMessage] = useState([]);
  const [IdMunicipio, setIdMunicipio] = useState();
  const [IdDepartamento, setIdDepartamento] = useState();
  const [IdPlan, setIdPlan] = useState();
  const [departments, setDepartments] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [subcriptions, setSubcriptions] = useState([]);
  const [succesMessage, setSuccesMesage] = useState('')

  useEffect(() => {
    getDepartments().then((response) => {
      setDepartments(response);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })

    getSubscriptions().then((response) => {
      setSubcriptions(response);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  const handleOnChangeDepartment = (e) => {
    setIdDepartamento(e.target.value);
    getMunicipios(e.target.value).then((response) => {
      setMunicipios(response);
      console.log(response);
    }).catch((error) => { console.log(error); });
  }


  const handleOnChangeMunicipio = (e) => {
    setIdMunicipio(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const wa = SignUpFormValidator(email, password, confirmPassword, name, lastname, birthdayDate, phone, IdDepartamento, IdMunicipio);
    setWarningMessage(wa);

    if (wa.length === 0) {
      setSending(true);
      Register({
        email: email,
        password: password,
        firstname: name,
        lastname: lastname,
        phone: phone,
        birthdate: birthdayDate,
        IdMunicipio: Number(IdMunicipio),
        IdPlan: Number(IdPlan)
    }).then((response) => {
        if (response.error) {
          setWarningMessage([response.error]);
          setSending(false);
        } else {
          setSuccesMesage('Registrado correctamente')       
        }
      }).catch((error) => {
        console.log(error);
        setWarningMessage(["User already exists"]);
        setSending(false);
      });

    }


  }

  return (
    <div class="flex bg-cover flex-col items-center justify-center py-5">
      {warningMessage.length > 0 && <ErrorListNotification errors={warningMessage} />}
      {succesMessage.length > 0 && <SuccessNotification message={succesMessage} buttonAction="/login" buttonText="Ir a login" />}
      <form class="flex flex-col mt-6 w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 gap-2">
        <div class="flex justify-center mx-auto">
          <img class="w-auto h-15 sm:h-14" src="/logo.webp" alt="" />
        </div>
        <div>
          <label for="name" required class="block text-sm text-gray-800 dark:text-gray-200">Nombre</label>
          <input type="text" disabled={sending} id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" autoComplete="name" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="lastname" class="block text-sm text-gray-800 dark:text-gray-200">Apellido</label>
          <input type="text" disabled={sending} id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" autoComplete="username" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="birthday-date" class="block text-sm text-gray-800 dark:text-gray-200">Fecha de Nacimiento</label>
          <input type="date" disabled={sending} id="birthday-date" value={birthdayDate} onChange={(e) => setBirthdayDate(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="email" class="block text-sm text-gray-800 dark:text-gray-200">Correo</label>
          <input disabled={sending} id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="phone" class="block text-sm text-gray-800 dark:text-gray-200">Telefono</label>
          <input disabled={sending} id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="password" class="block text-sm text-gray-800 dark:text-gray-200">Contraseña</label>
          <input disabled={sending} id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" autoComplete="current-password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="confirm-password" class="block text-sm text-gray-800 dark:text-gray-200">Confirmar Contraseña</label>
          <input disabled={sending} id="confirm-password" type="password" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="current-password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <div>
          <label htmlFor="confirm-password" class="block text-sm text-gray-800 dark:text-gray-200">Departamento</label>
          <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleOnChangeDepartment}>
            <option class="text-white" selected hidden>---------------</option>
            {departments.map((department) => {
              return <option key={department.IdDepartamento} class="text-white" value={department.IdDepartamento}>{department.Descripcion}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="confirm-password" class="block text-sm text-gray-800 dark:text-gray-200">Municipio</label>
          <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleOnChangeMunicipio} >
            <option class="text-white" selected hidden>---------------</option>
            {municipios.map((municipio) => {
              return <option key={municipio.IdMunicipio} class="text-white" value={municipio.IdMunicipio}>{municipio.Descripcion}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="confirm-password" class="block text-sm text-gray-800 dark:text-gray-200">Suscripcion</label>
          <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => {setIdPlan(e.target.value)}}>
            <option class="text-white" selected hidden>---------------</option>
            {subcriptions.map((subcription) => {
              return <option key={subcription.IdPlan} class="text-white" value={subcription.IdPlan}>{subcription.NombrePlan} - ${subcription.Precio}</option>
            })}
          </select>
        </div>
        <div class="mt-6">
          <button disabled={sending} onClick={handleSubmit} type="submit" class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-secondary rounded-lg hover:bg-secondary-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Registrarme
          </button>
        </div>
        <p class="mt-8 text-xs font-light text-center text-gray-400"> Ya tengo una cuenta <Link href="/login" class="font-medium text-gray-700 dark:text-gray-200 hover:underline">Iniciar sesion</Link></p>
      </form>
    </div>
  )
}
