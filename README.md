# ProyectoParadigmas-OneFlow
En esto proyecto para el curso Paradigmas de Programación en la Universidad Nacional se creará un transpilador en línea que tomara como input el lenguaje OneFlow (inventado) y lo transpilará a Javascript

## Pasos a seguir para levantar el proyecto desde cero

Para instalar y correr el proyecto basta con abrir el archivo `run-project.bat` y eso ejecutará unos comandos automatizados para iniciar el proyecto.

En caso de desear iniciar el proyecto a mano se puede seguir lo siguiente:

1. Primero abrimos una consola en la ruta `ProyectoParadigmas-OneFlow/Server` y ejecutamos lo siguiente:

    ```bash
    npm install
    npm run dev
    ```

2. Después abrimos una consola en la ruta `ProyectoParadigmas-OneFlow/client` y ejecutamos lo siguiente:

    ```bash
    npm install
    npm run build
    cd build
    ```

3. Aquí seleccionamos con qué servidor queremos correr nuestro cliente, en nuestro caso será con `http-server`:

    ```bash
    http-server
    ```

En caso de encontrarse ocupado el puerto 3001 para el servidor será necesario entrar a la ruta `ProyectoParadigmas-OneFlow\client\src\componentes\Url.js` y en el archivo poner el nuevo puerto por el cual se ejecuta el servidor.

Con estos comandos deberíamos ser capaces de iniciar el proyecto.


## Herramientas Utilizadas

Aquí están algunas de las principales herramientas y tecnologías que se utilizan en este proyecto:

- [React](https://reactjs.org/): Una biblioteca de JavaScript para construir interfaces de usuario interactivas.
- [Express](https://expressjs.com/): Un framework de aplicaciones web para Node.js utilizado para crear servicios web y API.

## Autores del Proyecto

Los siguientes son los autores principales de este proyecto:

- [Santiago Osorio Castañeda](https://github.com/Osorio-Tiago): Estudiante de cuarto año de Ingeniería en Sistemas de la Universidad Nacional de Costa Rica.
- [María Arias Mora](https://github.com/PaulaTomoko): Estudiante de cuarto año de Ingeniería en Sistemas de la Universidad Nacional de Costa Rica.
- [José Sequeira Hernández](https://github.com/Jose0696): Estudiante de cuarto año de Ingeniería en Sistemas de la Universidad Nacional de Costa Rica.
- [Dylan M](https://github.com/dylancr27): Estudiante de cuarto año de Ingeniería en Sistemas de la Universidad Nacional de Costa Rica.


