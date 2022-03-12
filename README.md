# STAR WARS - Demo App

Está aplicación permite iniciar sesión y navegar utilizado como backend la API de [Swapi.dev](https://swapi.dev/).

[Ver proyecto](https://star-wars-da-door.netlify.app/)

## Uso

Para iniciar sesión debe proporcionar como usuario el nombre de alguno de los personajes existentes en los enpoint de `/people`, disponibles en la API de Swapi, y la contraseña será la propiedad `hair_color` de ese mismo personaje. Por ejemplo:

[Darth Vader](https://swapi.dev/api/people/4): https://swapi.dev/api/people/4

```
//Respuesta de Swapi

{
	"name": "Darth Vader",
	"height": "202",
	"mass": "136",
	"hair_color": "none",
	"skin_color": "white",
	"eye_color": "yellow",
	"birth_year": "41.9BBY",
	"gender": "male",
	"homeworld": "https://swapi.dev/api/planets/1/",
	"films": [
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/6/"
	],
	"species": [],
	"vehicles": [],
	"starships": [
		"https://swapi.dev/api/starships/13/"
	],
	"created": "2014-12-10T15:18:20.704000Z",
	"edited": "2014-12-20T21:17:50.313000Z",
	"url": "https://swapi.dev/api/people/4/"
}

```

Utilizariamos los datos de está forma:

Usuario => Darth Vader
Contraseña => none

Una vez logueado obtendrá las peliculas donde el personaje elegido como usuario aparece y tambien podrá acceder a más detalles como:

- Año de estreno
- Directores
- Productores
- Lista de personajes
- Sinópsis

**Importante**: Si tiene 3 intentos fallidos intentando loguearse deberá esperar 1 minuto para intentarlo de nuevo

## Instalacion y Configuración

### Instalar dependencias

```
npm install
```

### Variables de Entorno

Este proyecto utiliza dos variables de entorno que puede configurar entrando en .env o agregar más anteponiendo la palabra VITE seguido de \_VARIABLE

La varible SK es utilizada para hacer la encriptación AES

```
VITE_SWAPI=https://swapi.dev/api
VITE_SK= Star*Wars*SWAPI*-Test/2022-03-08
```
