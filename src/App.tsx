import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  CheckCircle,
  EnvelopeSimple,
  HouseLine,
  Images,
  MapPinLine,
  PhoneCall,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Timer,
  X,
} from "@phosphor-icons/react";

type Category = "Salle de bain" | "Cover Styl" | "Solar Screen" | "Tapisserie" | "Parquet";

type Project = {
  id: string;
  title: string;
  category: Category;
  location: string;
  summary: string;
  year: string;
  duration: string;
  budget: string;
  features: string[];
  cover: string;
  images: string[];
};

const categories: Array<Category | "Tous"> = [
  "Tous",
  "Salle de bain",
  "Cover Styl",
  "Solar Screen",
  "Tapisserie",
  "Parquet",
];

const facebookBathroomImages = Array.from({ length: 9 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return `/images/facebook/sdb-fb-${id}.jpg`;
});

const projects: Project[] = [
  {
    id: "salle-de-bain-complete",
    title: "Salle de bain complète",
    category: "Salle de bain",
    location: "Grundviller et Moselle",
    summary: "Dépose, préparation, douche, faïence, meuble double vasque et finitions coordonnées.",
    year: "2025",
    duration: "3 semaines",
    budget: "Sur devis",
    features: ["Dépose et préparation", "Douche vitrée", "Faïence et finitions", "Meuble vasque coordonné"],
    cover: "/images/local/sdb-apres-douche.jpg",
    images: [
      "/images/local/sdb-apres-douche.jpg",
      "/images/local/sdb-apres-meuble.jpg",
      "/images/local/sdb-avant-baignoire.jpg",
      "/images/local/sdb-avant-demolition.jpg",
      ...facebookBathroomImages.slice(0, 4),
    ],
  },
  {
    id: "douche-accessible",
    title: "Douche accessible",
    category: "Salle de bain",
    location: "Habitat adapté",
    summary: "Remplacement de baignoire, accès simplifié, équipements sécurisants et pose soignée.",
    year: "2025",
    duration: "2 semaines",
    budget: "Sur devis",
    features: ["Remplacement baignoire", "Accès simplifié", "Équipements sécurisants", "Pose propre"],
    cover: "/images/facebook/sdb-fb-02.jpg",
    images: [
      "/images/facebook/sdb-fb-02.jpg",
      "/images/facebook/sdb-fb-03.jpg",
      "/images/facebook/sdb-fb-04.jpg",
      "/images/local/handibat-silverbat.jpg",
    ],
  },
  {
    id: "renovation-salle-eau",
    title: "Salle d'eau contemporaine",
    category: "Salle de bain",
    location: "Chantier LBR",
    summary: "Volumes clairs, parois noires, carrelage minéral et éclairage encastré.",
    year: "2025",
    duration: "2 à 3 semaines",
    budget: "Sur devis",
    features: ["Carrelage minéral", "Parois noires", "Éclairage encastré", "Finitions contemporaines"],
    cover: "/images/facebook/sdb-fb-06.jpg",
    images: [
      "/images/facebook/sdb-fb-06.jpg",
      "/images/facebook/sdb-fb-05.jpg",
      "/images/facebook/sdb-fb-07.jpg",
      "/images/facebook/sdb-fb-08.jpg",
      "/images/facebook/sdb-fb-09.jpg",
    ],
  },
];

const services = [
  ["Salle de bain", "Rénovation clé en main, de la dépose aux finitions."],
  ["Cover Styl", "Adhésifs décoratifs pour transformer sans tout remplacer."],
  ["Solar Screen", "Films anti-UV, protection, intimité et confort thermique."],
  ["Tapisserie", "Préparation des supports et pose nette."],
  ["Parquet", "Pose, remplacement et finition des sols."],
] as const;

const phone = "06 76 42 07 64";
const phoneHref = "tel:+33676420764";
const email = "contact.labellerenovation@gmail.com";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState(null, "", href);
    setPath(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header navigate={navigate} currentPath={path} />
      {path === "/realisations" ? <RealisationsPage /> : <HomePage navigate={navigate} />}
      <Footer />
    </>
  );
}

function Header({
  navigate,
  currentPath,
}: {
  navigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
  currentPath: string;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={navigate("/")}>
        <img src="/images/local/logo-lbr-square.jpg" alt="LBR La Belle Rénovation" />
        <span>LBR</span>
      </a>
      <nav aria-label="Navigation principale">
        <a className={currentPath === "/" ? "active" : ""} href="/" onClick={navigate("/")}>
          Accueil
        </a>
        <a
          className={currentPath === "/realisations" ? "active" : ""}
          href="/realisations"
          onClick={navigate("/realisations")}
        >
          Réalisations
        </a>
      </nav>
      <a className="header-call" href={phoneHref}>
        <PhoneCall size={18} weight="bold" />
        <span>{phone}</span>
      </a>
    </header>
  );
}

function HomePage({
  navigate,
}: {
  navigate: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Grundviller · Intervention Moselle</p>
          <h1>La Belle Rénovation</h1>
          <p className="lead">
            Rénovation de salle de bain, Cover Styl, Solar Screen, tapisserie et parquet.
            Une approche nette: comprendre le besoin, protéger le lieu, exécuter proprement,
            livrer un résultat lisible.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={phoneHref}>
              <PhoneCall size={20} weight="bold" />
              Appeler
            </a>
            <a className="button secondary" href="/realisations" onClick={navigate("/realisations")}>
              Voir les réalisations
              <ArrowRight size={20} weight="bold" />
            </a>
          </div>
          <div className="proof-row">
            <span>
              <SealCheck size={18} weight="fill" />
              Certifié Cover Styl
            </span>
            <span>
              <ShieldCheck size={18} weight="fill" />
              Certifié Solar Screen
            </span>
          </div>
        </div>
        <div className="hero-visual reveal delay-1" aria-label="Avant après salle de bain">
          <figure className="photo-stack after">
            <img src="/images/local/sdb-apres-douche.jpg" alt="Salle de bain rénovée avec douche vitrée" />
            <figcaption>Après</figcaption>
          </figure>
          <figure className="photo-stack before">
            <img src="/images/local/sdb-avant-baignoire.jpg" alt="Salle de bain avant rénovation" />
            <figcaption>Avant</figcaption>
          </figure>
          <div className="floating-note">
            <Sparkle size={18} weight="fill" />
            <span>De la dépose à la finition</span>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <p className="eyebrow">Savoir-faire</p>
          <h2>Les surfaces qui changent la lecture d'une pièce.</h2>
        </div>
        <div className="service-grid">
          {services.map(([title, body], index) => (
            <article className="service-item reveal" style={{ animationDelay: `${index * 70}ms` }} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div>
          <p className="eyebrow">Habitat adapté</p>
          <h2>Handibat & Silverbat: confort, sécurité, autonomie.</h2>
          <p>
            LBR intervient aussi sur l'adaptation du logement pour les seniors et personnes à mobilité réduite:
            douche sécurisée, barres d'appui, sièges et solutions sur mesure.
          </p>
        </div>
        <img src="/images/local/handibat-silverbat.jpg" alt="LBR agréé Handibat et Silverbat" />
      </section>

      <section className="work-preview">
        <div className="section-heading compact">
          <p className="eyebrow">Réalisations</p>
          <h2>Des chantiers lisibles avant, pendant, après.</h2>
        </div>
        <div className="preview-strip">
          {projects.map((project) => (
            <img src={project.cover} alt={project.title} key={project.id} />
          ))}
        </div>
        <a className="text-link" href="/realisations" onClick={navigate("/realisations")}>
          Ouvrir la galerie <ArrowRight size={18} weight="bold" />
        </a>
      </section>

      <section className="contact-band">
        <div>
          <p className="eyebrow">Devis et échange</p>
          <h2>Un projet à clarifier ? Contact direct.</h2>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={phoneHref}>
            <PhoneCall size={20} weight="bold" />
            {phone}
          </a>
          <a className="button secondary" href={`mailto:${email}`}>
            <EnvelopeSimple size={20} weight="bold" />
            Email
          </a>
        </div>
      </section>
    </main>
  );
}

function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "Tous">("Tous");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeProject && !dialog.open) dialog.showModal();
    if (!activeProject && dialog.open) dialog.close();
  }, [activeProject]);

  const openProject = (project: Project) => {
    setActiveProject(project);
    setActiveImage(0);
  };

  const closeProject = () => setActiveProject(null);

  const moveImage = (direction: -1 | 1) => {
    if (!activeProject) return;
    setActiveImage((current) => (current + direction + activeProject.images.length) % activeProject.images.length);
  };

  const countFor = (category: Category | "Tous") =>
    category === "Tous" ? projects.length : projects.filter((project) => project.category === category).length;

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveImage(-1);
      if (event.key === "ArrowRight") moveImage(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject]);

  return (
    <main className="realisations-page">
      <section className="page-hero">
        <p className="eyebrow">Portfolio</p>
        <h1>Nos réalisations</h1>
        <p>
          Découvrez les projets LBR: salle de bain, Cover Styl, Solar Screen, tapisserie et parquet.
          Cliquez sur un chantier pour ouvrir la galerie complète.
        </p>
      </section>

      <section className="filters" aria-label="Filtrer les réalisations">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "active" : ""}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            <span>{category === "Tous" ? "Tous les projets" : category}</span>
            <small>{countFor(category)}</small>
          </button>
        ))}
      </section>

      {filteredProjects.length ? (
        <section className="project-grid" aria-label="Liste des réalisations">
          {filteredProjects.map((project, index) => (
            <button
              className="project-card reveal"
              style={{ animationDelay: `${index * 90}ms` }}
              type="button"
              key={project.id}
              onClick={() => openProject(project)}
            >
              <div className="project-image">
                <img src={project.cover} alt={project.title} />
                <div className="project-overlay">
                  <span>{project.category}</span>
                  <strong>
                    Voir le projet <ArrowRight size={18} weight="bold" />
                  </strong>
                </div>
              </div>
              <div className="project-info">
                <span className="project-tag">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-meta">
                  <span>
                    <MapPinLine size={16} weight="bold" />
                    {project.location}
                  </span>
                  <span>
                    <CalendarBlank size={16} weight="bold" />
                    {project.year}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <Images size={42} weight="duotone" />
          <h2>{activeCategory}</h2>
          <p>Photos non encore classées dans cette catégorie pour cette première version.</p>
        </section>
      )}

      <dialog
        className="project-modal"
        ref={dialogRef}
        onClose={closeProject}
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
        aria-label={activeProject?.title ?? "Réalisation"}
      >
        {activeProject ? (
          <div className="modal-container" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Fermer" onClick={closeProject}>
              <X size={24} weight="bold" />
            </button>
            <div className="modal-gallery">
              <img src={activeProject.images[activeImage]} alt={`${activeProject.title} ${activeImage + 1}`} />
              <button className="modal-arrow prev" type="button" aria-label="Image précédente" onClick={() => moveImage(-1)}>
                <CaretLeft size={28} weight="bold" />
              </button>
              <button className="modal-arrow next" type="button" aria-label="Image suivante" onClick={() => moveImage(1)}>
                <CaretRight size={28} weight="bold" />
              </button>
              <div className="modal-thumbnails" aria-label="Photos du projet">
                {activeProject.images.map((image, index) => (
                  <button
                    className={activeImage === index ? "active" : ""}
                    type="button"
                    key={image}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Voir la photo ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-info">
              <span className="project-tag">{activeProject.category}</span>
              <h2>{activeProject.title}</h2>
              <p className="modal-description">{activeProject.summary}</p>
              <div className="modal-details">
                <div className="detail-item">
                  <label>Lieu</label>
                  <span>{activeProject.location}</span>
                </div>
                <div className="detail-item">
                  <label>Date</label>
                  <span>{activeProject.year}</span>
                </div>
                <div className="detail-item">
                  <label>Durée</label>
                  <span>{activeProject.duration}</span>
                </div>
                <div className="detail-item">
                  <label>Budget</label>
                  <span>{activeProject.budget}</span>
                </div>
              </div>
              <div className="modal-features">
                <h4>Points du chantier</h4>
                <ul>
                  {activeProject.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle size={18} weight="fill" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-bottom">
                <span>
                  <Timer size={18} weight="bold" />
                  Photo {activeImage + 1} / {activeProject.images.length}
                </span>
                <a href={phoneHref}>
                  <PhoneCall size={18} weight="bold" />
                  Demander un devis similaire
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src="/images/local/logo-lbr-square.jpg" alt="LBR La Belle Rénovation" />
        <span>La Belle Rénovation</span>
      </div>
      <address>
        <HouseLine size={18} weight="bold" />
        Grundviller, France, 57510
      </address>
      <a href={phoneHref}>{phone}</a>
      <a href={`mailto:${email}`}>{email}</a>
    </footer>
  );
}

export default App;
