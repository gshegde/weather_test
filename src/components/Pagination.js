import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from './Pagination.module.css';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
        // console.log("GSH" + i);
    }
    return (

        <div className={styles.menu}>
            <div className={styles.table}>
                <ul className={styles.horizontal}>
                    {pageNumbers.map(number => (
                        <li className={styles.horizontala} key={number}> <a className={styles.newsitem} onClick={() => paginate(number)} href='!#'>{number}</a>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )

}

export default Pagination;