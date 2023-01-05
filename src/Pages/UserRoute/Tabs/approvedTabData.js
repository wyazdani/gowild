import { React, useState, useEffect } from "react";
import { Table, Dropdown, Button, Row, Col, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import cardimg from "Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

const AllTabData = (props) => {


    const { content } = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
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


    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }




    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }


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
                                    <Form.Control type="search" placeholder="Search Users by Name or Email" onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <Form.Check type="checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Route Name</th>
                        <th>date posted</th>
                        <th>Event Date</th>
                        <th>status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : (
                                item.user.firstName.toLowerCase().includes(search) ||
                                item.user.lastName.toLowerCase().includes(search)  ||
                                item.user.email.toLowerCase().includes(search) 
                            )
                    }).map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={content.user.picture} alt={content.user.firstName} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.user.firstName + " " + content.user.lastName}</h4>
                                        <div className={"text-muted"}>{content.user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.title}
                            </td>
                            <td>
                                {(formatDate(content.updatedDate))}
                            </td>
                            <td>
                                {(formatDate(content.createdDate))}
                            </td>
                            <td>
                                {content.user.status.statusName === "active"
                                    ? <span class="text-success">Approved</span>
                                    : <span class="text-danger">Pending</span>
                                }
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <i className={"far fa-ellipsis-v fa-fw"}></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {content.user.status.statusName === "active"
                                            ? <Dropdown.Item href="#/">
                                                <i className={"fal fa-ban bg-danger text-white"}></i>
                                                Reject
                                            </Dropdown.Item>
                                            : <Dropdown.Item href="#/">
                                                <i className={"fal fa-check bg-success text-white"}></i>
                                                Approve
                                            </Dropdown.Item>
                                        }
                                        <Dropdown.Item href="users-route/view-route">
                                            <i className={"fal fa-eye bg-dark text-white"}></i>
                                            View
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="result_pagination">
                <span> {currentItems.length} of {content.length} </span>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="  >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={7}
                    pageCount={pageCount}
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

export default AllTabData;