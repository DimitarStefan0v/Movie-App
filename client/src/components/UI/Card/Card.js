import { urls } from '../../../utils/urls';

import classes from './Card.module.css';

const Card = (props) => {
    return (
        <div className={classes.card}>
            <img src={props.poster ? urls.images + props.poster : urls.defaultImage} alt={props.title} />
            <div className={classes.title}>{props.title}</div>
        </div>
    );
};

export default Card;