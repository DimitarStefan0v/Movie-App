import { urls } from '../../../utils/urls';

import classes from './Card.module.css';

const Card = (props) => {
    return (
        <div className={classes.card}><img src={urls.images + props.movie.poster_path} alt={props.movie.title} /></div>
    );
};

export default Card;