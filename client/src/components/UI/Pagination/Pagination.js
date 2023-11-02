import classes from './Pagination.module.css';
import { useState } from 'react';

const Pagination = (props) => {
    const [previousPages, setPreviousPages] = useState([props.currentPage - 3 ,props.currentPage - 2 ,props.currentPage - 1]);
    const [nextPages, setNextPages] = useState([props.currentPage + 1, props.currentPage + 2, props.currentPage + 3]);

    const changePagination = (page) => {
        if (page < 1) {
            page = 1;
        }

        if (page > props.lastPage) {
            page = props.lastPage;
        }

        setPreviousPages(state => [page - 3 ,page - 2 ,page - 1]);
        setNextPages(state => [page + 1, page + 2, page + 3]);
        props.changePageHandler(page);
    };

    const showFirstPage = () => {
        if (props.currentPage > 1) {
            return <div className={classes.page} onClick={() => changePagination(1)}>First</div>
        }
    };

    const showLastPage = () => {
        if (props.currentPage < props.lastPage) {
            return <div className={classes.page} onClick={() => changePagination(props.lastPage)}>Last</div>
        }
    };

    const showPreviousPage = () => {
        if (props.currentPage > 1) {
            return <div className={`${classes.page} ${classes.mobile}`} onClick={() => changePagination(props.currentPage - 1)}>Previous</div>
        }
    };

    const showNextPage = () => {
        if (props.currentPage < props.lastPage) {
            return <div className={`${classes.page} ${classes.mobile}`} onClick={() => changePagination(props.currentPage + 1)}>Next</div>
        }
    };

    return (
        <div className={classes.wrapper}>
            {showFirstPage()}
            {showPreviousPage()}

            {previousPages.map(x => {
                if (x >= 1) {
                    return <div className={`${classes.page} ${classes.desktop}`} key={x} onClick={() => changePagination(x)}>{x}</div>
                }

                return null;
            })}

            <div className={`${classes.page} ${classes.current}`}>{props.currentPage}</div>
            
            {nextPages.map(x => {
                if (x <= props.lastPage) {
                    return <div className={`${classes.page} ${classes.desktop}`} key={x} onClick={() => changePagination(x)}>{x}</div>
                }

                return null;
            })}

            {showNextPage()}
            {showLastPage()}

        </div>
    );
};

export default Pagination;