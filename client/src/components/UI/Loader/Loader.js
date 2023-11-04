import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes['loading-dot']}></div>
            <div className={classes['loading-dot']}></div>
            <div className={classes['loading-dot']}></div>
        </div>
    );
};

export default Loader;