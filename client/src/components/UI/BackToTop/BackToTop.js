import { useState, useEffect } from 'react';

import classes from './BackToTop.module.css';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 50 ? setVisible(true) : setVisible(false);
        };

        window.addEventListener("scroll", handleScrollButtonVisibility);

        return () => window.removeEventListener('scroll', handleScrollButtonVisibility);
    }, [])


    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
           {visible ? <div onClick={backToTop} className={classes.wrapper}>&#8593;</div> : null}
        </>
    );
};

export default BackToTop;