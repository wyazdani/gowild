import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { NavLink } from 'react-router-dom';

const Paginations = ({ pages, setCurrentPage, content, currentEntries }) => {

    // const pages = 5; 

    const NumOfPages = [];
    

    for (let i = 1; i <= pages; i++) {
        NumOfPages.push(i);
    }

    const [currenButton, setCurrenButton] = useState(1);

    useEffect(() => {
        setCurrentPage(currenButton);
    }, [currenButton, setCurrentPage])

    

    return (
        <>
            <Pagination>
                <div className="result">
                    <p>Showing <b> {currentEntries.length} </b> out of  <b> {content.length}  </b> entries</p>
                </div>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`${currenButton === 1 ? 'page-item disabled' : 'page-item'}`} >
                            <p className="page-link" onClick={() => {
                                setCurrenButton((prev) => prev === 1 ? prev : prev - 1)
                            }}>Previous</p>
                        </li>

                        {
                            NumOfPages.map((page, ind) => {
                                return (
                                    <li key={ind} className={`${currenButton === page ? 'page-item active  ' : ' page-item'}`} >
                                        <p className="page-link " onClick={() => setCurrenButton(page)}>  {page}  </p>
                                    </li>
                                )
                            })
                        }

                        <li className={`${currenButton === NumOfPages.length ? 'page-item disabled' : 'page-item '}`}>
                            <p className="page-link" onClick={() => {
                                setCurrenButton((next) => next === NumOfPages.length  ? next : next + 1)
                            }}>Next</p>
                        </li>

                    </ul>
                </nav>
            </Pagination>
        </>
    )
}

export default Paginations;
