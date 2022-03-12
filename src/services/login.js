import crypting from '../helpers/crypto';

export default async function login({ username, password }) {
  try {
    const ENDPOINT = `${import.meta.env.VITE_SWAPI}/people/?search=${username}`;

    //Start request
    const res = await fetch(ENDPOINT);

    if (!res.ok) throw new Error(res.statusText);

    //Destructuring data
    const { count, results } = await res.json();

    if (count === 0)
      throw {
        code: '01',
        error: true,
        text: 'Usuario y/o contraseña incorrectos',
      };

    //Destructuring only first result
    const { name, hair_color, url } = results[0];

    //Decode password
    const _password = crypting.decode(password);

    if (username !== name || _password !== hair_color)
      throw {
        code: null,
        error: true,
        text: 'Usuario y/o contraseña incorrectos',
      };

    return { token: crypting.encode(hair_color), url };
  } catch (error) {
    throw error;
  }
}
