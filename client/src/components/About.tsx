import { AUTHOR, GITHUB_PROFILE_URL, TECHNOLOGIES } from '../utils/constants';
import '../styles/about.css';

function About() {
  return (
    <main className="about">
      <h1 className="about__title">Sobre el autor</h1>
      <section className="about__section" aria-labelledby="author-name">
        <h2 className="about__subtitle" id="author-name">
          {AUTHOR.name}
        </h2>
        <p className="about__text">{AUTHOR.bio}</p>
        <a className="about__link" href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
          Ver perfil de GitHub
        </a>
      </section>
      <section className="about__section" aria-labelledby="project-title">
        <h2 className="about__subtitle" id="project-title">
          Sobre este proyecto
        </h2>
        <p className="about__text">
          Esta Pokédex es el proyecto final del programa de desarrollo web de TripleTen. Es un
          proyecto educativo, sin relación oficial con Nintendo ni The Pokémon Company.
        </p>
        <ul className="about__technologies">
          {TECHNOLOGIES.map((technology) => (
            <li key={technology} className="about__technology">
              {technology}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default About;
