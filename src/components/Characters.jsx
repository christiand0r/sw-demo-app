import { useEffect, useState } from 'react';

/* Third Libraries */
import short from 'short-uuid';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

/* Components */
import Loader from './layout/Loader';
import useVisit from '../hooks/useVisit';

const translator = short();

const Characters = ({ charactersURL, movie }) => {
  const { name } = useParams();

  const { visit, visited } = useVisit('#sw-demo');

  //State to characters
  const [characters, setCharacters] = useState(null);

  //State handle characters with their planets
  const [charactersWPlanets, setcharactersWPlanets] = useState(null);

  useEffect(() => {
    const req = charactersURL.map(charURL => fetch(charURL));

    const getCharacters = async () => {
      try {
        const res = await Promise.all(req);
        //Parsed all req to JSON
        const data = await Promise.all(res.map(res => res.json()));
        setCharacters(data);
      } catch (error) {
        return error;
      }
    };
    getCharacters();

    visited();
  }, []);

  //Set a new visit
  useEffect(() => visited(), [visit]);

  //Obtain the characters with respective their planet
  useEffect(() => {
    if (!characters) return;

    //Generate a promises array
    const req = characters.map(({ homeworld }) => fetch(homeworld));

    const getHomeworld = async () => {
      try {
        //Transform to object response
        const res = await Promise.all(req);

        //Parsed and destructuring of properties our interest
        const data = await Promise.all(res.map(res => res.json())).then(
          planets => planets.map(({ name, url }) => ({ name, url }))
        );

        //Make object with character + homeworld
        const cwp = data.map((planet, i) => ({
          planet: planet.name,
          ...characters[i],
        }));

        //Update state
        setcharactersWPlanets(cwp);
      } catch (error) {
        return error;
      }
    };
    getHomeworld();
  }, [characters]);

  return (
    <>
      {charactersWPlanets ? (
        <table className='characters'>
          <thead>
            <tr>
              <td colSpan='4'>Personajes en: {movie}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Planeta hogar</th>
              <th>Color de cabello</th>
              <th>Altura (cm)</th>
            </tr>

            {charactersWPlanets.map(
              ({ name, hair_color, height, planet }, i) => (
                <tr key={translator.new()}>
                  <td data-content='Nombre'>{name}</td>
                  <td data-content='Planeta hogar'>{planet}</td>

                  <td data-content='Color de cabello'>
                    {hair_color === 'none' || hair_color === 'n/a'
                      ? 'no tiene'
                      : hair_color}
                  </td>

                  <td data-content='Altura (cm)'>{height}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className='container-loader'>
          <Loader />
        </div>
      )}
    </>
  );
};

Characters.propTypes = {
  charactersURL: PropTypes.array.isRequired,
  movie: PropTypes.string,
};

export default Characters;
