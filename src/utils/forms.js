export function SignUpFormValidator(
    email,
    password,
    confirmPassword,
    name,
    lastname,
    fechaNacimiento,
    phone,
    IdDepartamento,
    IdMunicipio,
){

    const warnings = [];
    const currentDate = new Date();
    const birthDate = new Date(fechaNacimiento);

    if (email.length === 0) {
        warnings.push('Correo requerido');
    }

    if (password.length === 0) {
        warnings.push('Contraseña requerida');
    }

    if (name.length === 0) {
        warnings.push('Nombre requerido');
    }

    if (lastname.length === 0) {
        warnings.push('Apellido requerido');
    }

    if (password !== confirmPassword) {
        warnings.push('Las contraseñas no coinciden');
    }
    if(fechaNacimiento.length === 0){
        warnings.push('Fecha de nacimiento requerida');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Formato de correo inválido');
    }

    if (password.length < 6) {
        warnings.push('La contraseña debe tener al menos 6 caracteres');
    }

    if(!IdDepartamento){
        warnings.push('Departamento requerido');
    }
    if(!IdMunicipio){
        warnings.push('Municipio requerido');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('La contraseña debe contener al menos un caracter especial');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('La contraseña no puede contener secuencias de números');
    }
    
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        warnings.push('Debes ser mayor de edad para registrarte');
    }
    
    if(phone.length === 0){
        if(phone.length!=8){
            warnings.push('El número de teléfono debe tener 8 dígitos');
        }
    }
    return warnings;
}

export function LoginFormValidator(
    email,
    password
){

    const warnings = [];

    if (email.length === 0) {
        warnings.push('Correo requerido');
    }

    if (password.length === 0) {
        warnings.push('Contraseña requerida');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Correo inválido');
    }

    if (password.length < 6) {
        warnings.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('La contraseña debe contener al menos un caracter especial');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('La contraseña no puede contener secuencias de números');
    }

    return warnings;
}

export function PetFormValidator(
    nombre,
    edad,
    raza,
    detalles,
    isUpdate = false
){

    const warnings = [];

    if (nombre.length === 0) {
        warnings.push('Nombre requerido');
    }

    if (!edad) {
        warnings.push('Edad requerida');
    }
    
    if (edad < 0 || edad > 20) {
        warnings.push('Edad inválida');
    }

    if(!isUpdate){
        if (!raza) {
            warnings.push('Raza requerida');
        }
    }


    if (detalles.length === 0) {
        warnings.push('Detalles requeridos');
    }

    return warnings;
}

export function StoryValidator(
    descripcion
){

    const warnings = [];

    if (descripcion.length === 0) {
        warnings.push('Descripción requerida');
    }

    return warnings;
}