import { urls } from '../../../utils/urls';

const Card = (props) => {
    return (
        <div><img src={urls.images + props.movie.poster_path} alt={props.movie.title} /></div>
    );
};

export default Card;