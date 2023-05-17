# Backend Node.Js (Microservicios)

- Se espera que la persona sea creativa 🎨
- Programe de forma componentizada y ordenada 🏗
- Respete los request que pedimos 🤓
- Se espera que no sea un trabajo de mas de 8 horas, 12 horas como mucho ⏰

Obligatorio: Recorda abrir un repositorio público (puede ser Github, Gitlab, Bitbucket…) 
Nice to Have: Deseable que el proyecto esté deployado en un server (gratuito)
Nice to Have: Deseable que el proyecto tenga testings


1. Crear un proyecto llamado “API”.
2. El proyecto debe ser creado en Node con Express o Nest.
3. Implementar una librería de MicroServicios a elección.
4. Crear 2 módulos en el proyecto:
    1. Micro Servicio de Log In → que comprende los siguientes endpoints:
        1. Endpoint 1: Registrar usuario con lo siguientes campos (no requiere JWT):
            1. Mail
            2. Password
        2. Endpoint 2: Autenticación de usuarios previamente creado en el punto a) i) (No requiere JWT, pero si debe generar uno en el response.)
        3. Endpoint 3 : Listar usuarios (Requiere JWT y llama al al modulo de Negocios al endpoint b) i)
    2. Micro Servicio de Negocios:
        1. Endpoint 4: Listar usuarios (Requiere JWT)
            1. Debe permitir visualizar todos los usuarios registrados
            2. Debe tener paginación
            3. Debe permitir buscar de manera no sensitiva por el mail
5. BBDD: MongoDB
6. Condiciones:
    1. Los endpoints 1, 2 y 3 → deben de poder ser accesibles desde el local host
    2. Endpoint 4: Solo es accesible por medio del endpoint 3, no se debe poder acceder al mismo por el endpoint 3