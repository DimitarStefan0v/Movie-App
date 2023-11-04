import { useState } from 'react';

import classes from './Sorter.module.css';

const Sorter = (props) => {
    const [filters] = useState({
        'popularity.desc': 'Popularity',
        'revenue.desc': 'Revenue',
        'vote_count.desc': 'Vote Count',
        'vote_average.desc': 'Vote Average',
    });

    const sortQueryHandler = (query) => {
        props.changeSortQueryHandler(query);
    };

    return (
        <div>
            <ul className={classes.list}>
                {Object.keys(filters).map((key, index) => {
                    return (
                        <li key={key} className={`${classes.item} ${props.currentFilter === key ? classes.current : ''}`} onClick={() => sortQueryHandler(key)}>{filters[key]}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Sorter;