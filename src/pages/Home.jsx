import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextPressure } from '../components/TextPressure';
import RotatingText from '../components/RotatingText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // Déclenche l'animation quand l'élément atteint 80% de la fenêtre
                        toggleActions: "play none none none", // Joue l'animation une seule fois
                    },
                }
            );
        });
    }, []);

    return (
        <main>
            <section className="hero" >
                <TextPressure
                    text="STI2D"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ff0000"
                    minFontSize={36}
                    fontFamily='mont'
                />
                <section className="rotating-text-container">
                    <p>Construisons ensemble un avenir plus</p>
                    <RotatingText
                        texts={['intelligent', 'durable', 'connecté', 'efficace', 'innovant']}
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </section>
            </section>
            <section className="content" ref={(el) => el && sectionsRef.current.push(el)}>
                <article className="content-item">
                    <div className="container">
                        <h2>Présentation</h2>
                        <p>Le baccalauréat STI2D s'adresse aux lycéens intéressés par les innovations technologiques respectueuses de l'environnement et sensibles à une approche concrète de l'enseignement des sciences.
                            <br />
                            <br />
                            Cette filière regroupe des spécialités variées :
                            <br />
                            <ul style={{ marginLeft: "20px" }}>
                                <li>Systèmes d'Information et Numérique (SIN)</li>
                                <li>Énergie et Environnement (EE)</li>
                                <li>Innovation Technologique et Éco-Conception (ITEC)</li>
                                <li>Architecture (AC - pas disponible à Sacré-Coeur)</li>
                            </ul>
                            <br />
                            Au cours de la première année de lycée, vous suivrez des cours dans toutes les spécialités : énergie, mécanique, informatique... Vous découvrirez également des logiciels et des technologies tels que SolidWorks (modélisation 3D), Arduino (prototypage), BimSolar (simulation solaire 3D), Sketchup (modélisation 3D), Raspberry Pi (Nano-ordinateur)...
                        </p>
                    </div>
                    <img src="https://images.squarespace-cdn.com/content/v1/61deae4cf38bad1083bfed91/86fd0489-6bf6-4aff-8460-6e7e4df0f57f/Mod%C3%A9lisation+moteur+SolidWorks" draggable={false} alt="" />
                </article>
                <article className="content-item">
                    <div className="container">
                        <h2>Projets</h2>
                        <p>En première année de STI2D, vous allez découvrir des projets qui vont couvrir toutes les spécialités disponibles.
                            <br />
                            <br />
                            En voici quelques-un :
                            <ul style={{ marginLeft: "20px" }}>
                                <li>Clé USB | Faire un prototype d'un boîtié de clé USB (ITEC)</li>
                                <li>Abri de bus | Créer un abri de bus autonome (EE)</li>
                                <li>E-Garden | Faire un prototype d'un jardin connecté (SIN)</li>
                                <li>Station Météo | Créer une station météo pour LPO (SIN, ITEC & EE)</li>
                            </ul>
                        </p>
                    </div>
                    <img src="https://www.sti5d.com/src/img/projects/egarden/egarden.JPEG" draggable={false} alt="" />
                </article>
            </section>
        </main >
    );
};