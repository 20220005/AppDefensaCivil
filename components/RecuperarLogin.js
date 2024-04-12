const ResetContrasena = async () => {
    try {
        if(!email || !currentpassword) {
            console.log('Por favor, Ingresa tu contrasena y correo');
            return;
        }

        const userApi = await fetch('https://adamix.net/defensa_civil/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, currentPassword })
        });

        if (userApi.ok === true) {
            alert('Tu contraseña ha sido cambiada con existo');
        } else {
            alert('Tu contraseña no ha sido cambiada');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error);
        alert('Ha ocurrido un error. Por favor, intenta nuevamente más tarde.');
    }
};
    

