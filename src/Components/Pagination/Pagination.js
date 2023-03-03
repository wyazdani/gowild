import {React, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";

const Pagination = ({ pageSize, totalRecords, onPageChange, handlePageSize }) => {
    const totalPages = Math.ceil(totalRecords / pageSize);
    const recordLength = pageSize > totalRecords? totalRecords: pageSize
    const [fromRecord, setFromRecord] = useState(1);
    const [toRecord, setToRecord] = useState(recordLength);

    const handlePageClick = (event) => {
        setFromRecord((event.selected) * pageSize + 1)
        setToRecord(Math.min((event.selected+ 1) * pageSize, totalRecords))
        const newOffset = (event.selected * pageSize) % totalRecords;
        onPageChange(newOffset);
    };


    const handleRowsPerPageChange = (event) => {
        setFromRecord(1)
        const toRecord = parseInt(event.target.value)< totalRecords? parseInt(event.target.value): totalRecords
        setToRecord(toRecord)
        handlePageSize(parseInt(event.target.value))
    };

    return (
        <div className="result_pagination">
            <span> Rows per page: &nbsp; </span>
            <select onChange={handleRowsPerPageChange} value={pageSize}>
                {/* <option>{currentItems.length}</option> */}
                {/* {currentItems.length === 4 ? null  :<option value={4}>4</option>} */}
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
            </select> <i className="fa fa-sort-desc" aria-hidden="true"></i>
            <span className="mx-5"> {fromRecord} - {toRecord}  of {totalRecords} </span>
            <ReactPaginate
                breakLabel="..."
                nextLabel="  >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                rowsPerPage={totalRecords}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </div>
    );
}

export default Pagination;
