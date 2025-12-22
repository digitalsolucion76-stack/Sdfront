import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ImageLight from '../assets/img/icon.jpg';
import ImageDark from '../assets/img/icon.jpg';
import { Label, Input, Button } from '@windmill/react-ui';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async () => {
    setError('');
    const result = await login(nombre, contraseña);
    if (result.success) {
      history.push('/app');
    } else {
      setError(result.message || 'Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Iniciar Sesión</h1>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Label className="mt-4">
                <span>Nombre</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="nombre de usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Label>

              <Label className="mt-4">
                <span>Contraseña</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
              </Label>

              <Button className="mt-4" block onClick={handleLogin}>
                Iniciar Sesión
              </Button>

              <hr className="my-8" />

            
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
