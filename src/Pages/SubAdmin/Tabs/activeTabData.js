import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown } from "react-bootstrap";
import classes from "./index.module.scss";
import AuthService from "../../../services/auth.service";
import {ENDPOINT} from "../../../config/constants";
import swal from "sweetalert";
import accessHeader from "../../../services/headers/access-header";
import ReactPaginate from 'react-paginate';


const ActiveTabData = (props) => {

    const { content } = props;

 
    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [editSubAdmin, setEditSubAdmin] = useState(false);
    const [editItem , setEditItem] = useState(null);



    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(4);
    // const itemsPerPage = 3;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % content.length;
        setItemOffset(newOffset);
    };

    const handleRowsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    };
    


    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <Form.Check type="checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Online status</th>
                        <th>Username</th>
                        <th>account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={content.picture} alt={content.firstName} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.firstName+" "+content.lastName}</h4>
                                        <div className={"text-muted"}>{content.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.onlineStatus
                                    ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                    : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                }
                            </td>
                            <td>{content.firstName}</td>
                            <td>
                                {content.accountStatus === "active"
                                    ? <span class="text-success">Active</span>
                                    : <span class="text-danger">inactive</span>
                                }
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <i className={"far fa-ellipsis-v fa-fw"}></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/">
                                            <i className={"fal fa-ban bg-warning text-white"}></i>
                                            Disable User
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            <i className={"far fa-pen bg-dark text-white"}></i>
                                            Edit User
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/" onClick={() => {
                                                props.deleteSubAdmin(content.id)
                                            }}>
                                            <i className={"fal fa-trash bg-danger text-white"}></i>
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="result_pagination">
                <span> Rows per page: &nbsp; </span> 
                <select onChange={handleRowsPerPageChange} value={itemsPerPage}>
                    <option>{currentItems.length}</option>
                  {/* {currentItems.length === 4 ? null  :<option value={4}>4</option>} */}
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select> <i className="fa fa-sort-desc" aria-hidden="true"></i>

                <span className="mx-4"> {currentItems.length} of {content.length} </span>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={6}
                    pageCount={pageCount}
                    rowsPerPage={itemsPerPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"

                />
            </div>
        </>
    )
}

export default ActiveTabData;
