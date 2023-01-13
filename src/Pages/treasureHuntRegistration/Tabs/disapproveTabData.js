import { React, useState, useEffect, useContext } from "react";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import { Form, Dropdown, Row, Col, Button ,Table} from "react-bootstrap";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import ViewProfilePopup from "./viewProfilePopup";
import ReactPaginate from 'react-paginate';
import profile from "Images/Ellipse 768.png";

const DisapproveTabData = (props) => {

    /* Destructuring the props object. */
    const { content } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");
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

    const handleRowsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    };

    return(
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
                        <th> &nbsp;&nbsp;&nbsp;Name</th>
                        <th>Event Name</th>
                        <th>Online Status</th>
                        <th>Username</th>
                        <th>Application Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {currentItems.sort((a, b) => (a.name < b.name ? -1 : 1)).filter((row) =>
                            !search.length || row.user.firstName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.user.lastName.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
                            row.user.email.toString().toLowerCase().includes(search.toString().toLowerCase())).map((alltabdata) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                    {(content.picture)? <img src={"https://api.gowild.appscorridor.com" + content.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{alltabdata.user.firstName + " " + alltabdata.user.lastName}</h4>
                                        <div className={"text-muted"}>{alltabdata.user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {alltabdata.treasure_chest.title}
                            </td>
                            <td>
                                {alltabdata.treasure_chest.status === "pending"
                                    ? <span class={`${classes.tag} ${classes.inactive}`}>InActive</span>
                                    : <span class={`${classes.tag} ${classes.active}`}>Active</span>
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
                {/* <span className="mx-5"> {pageCount-1} - {currentItems.length}  of {content.length} </span> */}
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

        </>
    )
}

export default DisapproveTabData;