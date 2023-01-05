import { React, useState, useEffect, useContext } from "react";
import { Form, Dropdown, Button, Row, Col, Table } from "react-bootstrap";
import classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import Tables from "../../../Components/Table";
import ViewProfilePopup from "../Tabs/viewProfilePopup";
import { Link } from "react-router-dom";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';



const AllTabData = (props) => {


    /* Destructuring the props object. */
    const { content } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");

    const itemsPerPage = 3;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(content.slice(itemOffset, endOffset));
        
        setPageCount(Math.ceil(content.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, content]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % content.length;
        setItemOffset(newOffset);
    };



    return (
        <>
            <div className={classes.tableFilter}>
                <Form>
                    <Row>
                        <Col md={8}>
                            <div className={"d-md-flex"}>
                                <Button variant="filter">
                                    <i className={"fal fa-filter"}></i>
                                    Filter
                                </Button>
                                <Form.Group className={classes.searchForm}>
                                    <Form.Control type="search" placeholder="Search Users by Name, Email or Date" onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col md={4} className={"d-md-flex justify-content-end"}>
                            <Button variant={"success"} onClick={() => setModalShow(true)}>
                                Send Email
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <AddSubAdmin
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ViewProfilePopup
                show={modalShowView}
                onHide={() => setModalShowView(false)}
            />


            <Table>
                <thead>
                    <tr>
                        <th>
                            <Form.Check type="checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Event Name</th>
                        <th>Online Status</th>
                        <th>Username</th>
                        <th>Application Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.sort((a, b) => (a.name < b.name ? -1 : 1)).filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : (
                                item.user.firstName.toLowerCase().includes(search) ||
                                item.user.email.toLowerCase().includes(search)
                            )
                    }).map((alltabdata) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={alltabdata.user.picture} alt={alltabdata.user.firstName} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{alltabdata.user.firstName +" "+ alltabdata.user.lastName}</h4>
                                        <div className={"text-muted"}>{alltabdata.user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {alltabdata.treasure_chest.title}
                            </td>
                            <td>
                                {alltabdata.treasure_chest.status === "pending"
                                    ?  <span class={`${classes.tag} ${classes.inactive}`}>InActive</span> 
                                    :  <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                }
                            </td>
                            <td>
                                {alltabdata.user.firstName}
                            </td>
                            <td>
                                {alltabdata.status === 'approved' ? <span class="text-success">Approved</span>
                                    : alltabdata.status === 'pending' ? <span class="text-orange">Pending</span>
                                        : <span class="text-danger">Rejected</span>
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
                                        <Dropdown.Item href="#/" onClick={() => setModalShowView(true)}>
                                            <i className={"fal fa-user bg-dark text-white"}></i>
                                            View Profile
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="result_pagination mt-5">
                <span>Showing <b> {currentItems.length} </b> out of  <b> {content.length}  </b> entries</span>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
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

export default AllTabData;