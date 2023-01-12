import React, { useState, useEffect } from "react";
import { Form, Dropdown, Button, Row, Col, Table } from "react-bootstrap";
import classes from "../../treasureHuntRegistration/index.module.scss";
import ViewProfilePopup from "../UserComponent/ViewProfile/viewProfilePopup";
import EditUser from "../UserComponent/EditUser";
import AddUser from "../UserComponent/AddNewUser";
import ReactPaginate from 'react-paginate';



const AllTabData = (props) => {

    const { content } = props;


    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // var itemsPerPage = 4;



    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % content.length;
        setItemOffset(newOffset);
    };


    const [modalEditUser, setModalEditUser] = useState(false);
    const [editItem, setEditItem] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);

    const handleRowsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    };



    return (
        <>
            <div className={classes.tableFilter}>
                <Form>
                    <Row>
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fas fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                    <Form.Control type="search" placeholder="Search Users by Name, Email or Date" onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col md={4} className={"d-md-flex justify-content-end"}>
                            <Button onClick={() => setModalShow(true)}>
                                Add New
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th><Form.Check type="checkbox" /></th>
                        <th>Name</th>
                        <th>Online Status</th>
                        <th>Location</th>
                        <th>Account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.filter((row) =>
                            !search.length || row.firstName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.lastName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.email.toString().toLowerCase().includes(search.toString().toLowerCase())).map((content) => (
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>
                                        <div className={"d-flex"}>
                                            <div className={classes.userImg}>
                                                <img src={content.picture} alt={content.firstName} />
                                            </div>
                                            <div className={classes.description}>
                                                <h4 className={"font-16 mb-0"}>{content.firstName + " " + content.lastName}</h4>
                                                <div className={"text-muted"}>{content.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {content.onlineStatus === true
                                            ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                            : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                        }
                                    </td>
                                    <td>{content.location}</td>
                                    <td>
                                        {content.accountStatus === "active"
                                            ? <span class="text-success">Active</span>
                                            : <span class="text-danger">Disabled</span>
                                        }
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className={"far fa-ellipsis-v fa-fw"}></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/">
                                                    <i className={"fal fa-ban bg-danger text-white"}></i>
                                                    Disable User
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/" onClick={
                                                    () => {
                                                        setModalShowView(true)
                                                        setEditItem(content)
                                                    }
                                                }>
                                                    <i className={"fal fa-user bg-dark text-white"}></i>
                                                    View Profile
                                                </Dropdown.Item>
                                                {/*<Dropdown.Item href="#/" onClick={
                                                    () => {
                                                        setModalEditUser(true)
                                                        console.log(content)
                                                        setEditItem(content)
                                                    }
                                                }>
                                                    <i className={"far fa-pen bg-dark text-white"}></i>
                                                    Edit User
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/" onClick={() => {
                                                    props.deleteSubAdmin(content.id)
                                                }}>
                                                    <i className={"fal fa-trash bg-danger text-white"}></i>
                                                    Delete
                                                </Dropdown.Item>*/}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <div className="result_pagination">
                <span> Rows per page: &nbsp; </span>
                <select onChange={handleRowsPerPageChange} value={itemsPerPage}>
                    <option>{currentItems.length}</option>
                    {/* {currentItems.length === 4 ? null  :<option value={4}>4</option>} */}
                    <option value={5}>5</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                </select> <i className="fa fa-sort-desc" aria-hidden="true"></i>

                <span className="mx-5"> {currentItems.length} - {content.length} of {content.length} </span>
                {/* <span className="mx-5"> {currentItems.length}  of {content.length} </span> */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
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

            <EditUser
                show={modalEditUser}
                onHide={() => setModalEditUser(false)}
                editItem={editItem}
            />

            <AddUser
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ViewProfilePopup
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}

            />

        </>
    )
}

export default AllTabData;