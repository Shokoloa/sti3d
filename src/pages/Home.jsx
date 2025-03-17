import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LetterGlitch } from '../components/LetterGlitch';
import { TextPressure } from '../components/TextPressure';
import RotatingText from '../components/RotatingText';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <section>
            <section className="bg">
                <LetterGlitch
                    glitchSpeed={100}
                    centerVignette={true}
                    outerVignette={true}
                    smooth={true}
                />
            </section>
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
        </section >
    );
};