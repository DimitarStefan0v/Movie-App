import classes from './CardList.module.css';

const CardList = (props) => {
    return (
        <div className={classes.container}>{props.children}</div>
    );
};

export default CardList;