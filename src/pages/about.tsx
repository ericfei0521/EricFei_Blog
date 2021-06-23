import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import styles from '../../styles/AboutStyle';
interface Iprops {
    className: string;
}
const About = ({ className }: Iprops) => {
    let [firstLoade, setfirstLoad] = useState(false);

    useEffect(() => {
        setfirstLoad(true);
    }, []);

    return (
        <div className={`${className}`}>
            <div className="intro">
                <div>
                    <h2>Eric Fei</h2>
                    <h3>Front-End Developer & 3D Artist</h3>
                    <p>
                        I am a Front-End Developer with PM and VFX artist background , creating modern and user friendly
                        interfaces. I've had the chance to join a high intance program , Within 4 months i accomplished
                        two major projects Witch are a pure JS e-commerce website and React framework project management
                        plateform . Hope can make this world a little bit better and fancy through 3D skills and code.
                    </p>
                </div>
                <div className="contact">
                    <a href="https://www.instagram.com/eric_fei_01/" target="_blank">
                        <Image priority src="/images/instagram.svg" height={16} width={16} />
                    </a>
                    <a href="https://www.facebook.com/fei.eric.3/" target="_blank">
                        <Image priority src="/images/facebook.svg" height={16} width={16} />
                    </a>
                    <a href="https://github.com/ericfei0521" target="_blank">
                        <Image priority src="/images/github.svg" height={16} width={16} />
                    </a>
                </div>
            </div>
            <div className="image">
                <img src="/images/profile.jpeg" className={firstLoade ? 'animation_trigger' : ''} alt="" />
            </div>
        </div>
    );
};

export default styled(About)`
    ${styles}
`;
