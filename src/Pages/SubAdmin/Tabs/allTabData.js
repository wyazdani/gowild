import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "./index.module.scss";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import EditSubAdmin from "../../../Components/SubAdminComponent/EditSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import profile from "Images/routelist.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTabData = (props) => {

    /* Destructuring the props object. */
    const { content } = props;


    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    // edit state
    const [editSubAdmin, setEditSubAdmin] = useState(false);
    const [editItem, setEditItem] = useState(null);



    const [currentItems, setCurrentItems] = useState([]);
    // console.log(" currentItems", currentItems[0].id)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
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
    

    const submitEventForm = async (id) => {
        // console.log("1233"+id);
        return  AuthService.postMethod(`${ENDPOINT.sub_admin.active_inactive}${id}/status`, true)
            .then((res) => {
                // if (res.status === 201) {
                //     toast.success(res.data.message);
                // }
                 props.subAdminAllData()
                console.log(res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


    // useEffect(() => {
    //     submitEventForm();
    // }, [])
    

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
                            <Button onClick={() => setAddAdmin(true)}>
                                Add New
                            </Button>
                            <AddSubAdmin
                                subAdminAllData={props.subAdminAllData}
                                show={addAdmin}
                                onHide={() => setAddAdmin(false)}
                            />
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
                        <th> &nbsp;&nbsp;&nbsp; Name</th>
                        <th>Online status</th>
                        <th>Username</th>
                        <th>account Status</th>
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
                                            {(content.picture)? <img src={"https://api.gowild.appscorridor.com" + content.picture} width="100%" alt={"img"} /> :  <img src={profile} width="100%" alt={"img"} /> }
                                            </div>
                                            <div className={classes.description}>
                                                <h4 className={"font-16 mb-0"}>{content.firstName + " " + content.lastName}</h4>
                                                <div className={"text-muted"}>{content.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        { content.onlineStatus
                                            ? <span class={`${classes.tag} text-danger ${classes.active} `}>Active</span>
                                            : <span class={`${classes.tag} ${classes.inactive} text-default `}>Inactive </span>
                                        }
                                    </td>
                                    <td>{content.firstName}</td>
                                    <td>
                                        {content.accountStatus === "active"
                                            ? <span class="text-success ">  <b>ACTIVE</b></span>
                                            : <span class="text-danger"> <b>DISABLED</b> </span>
                                        }
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className={"far fa-ellipsis-v fa-fw"}></i>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/" 
                                                >
                                                    <i className={"fal fa-ban bg-warning text-white"}></i>
                                                    {content.accountStatus === "active" ? <p className="m-0 p-0" onClick={() => {
                                                       submitEventForm(content.id)
                                                    }}>Disable User</p> :  <p className="m-0 p-0" onClick={() => {
                                                       submitEventForm(content.id)
                                                    }}>Active User</p>}   
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/" onClick={
                                                    () => {
                                                        setEditSubAdmin(true)
                                                        setEditItem(content)
                                                    }
                                                }>
                                                    <i className={"far fa-pen bg-dark text-white"}></i>
                                                    Edit User
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/"
                                                    onClick={() => {
                                                        props.deleteSubAdmin(content.id)
                                                    }}
                                                >
                                                    <i className={"fal fa-trash bg-danger text-white"}></i>
                                                    Delete
                                                </Dropdown.Item>
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

                {/* <span className="mx-4"> {currentItems.length} - {content.length} of {content.length} </span> */}
                <span className="mx-5"> {pageCount-1} - {currentItems.length}  of {content.length} </span>
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
            <EditSubAdmin
                show={editSubAdmin}
                onHide={() => setEditSubAdmin(false)}
                editItem={editItem}
            />

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </>
    )
}

export default AllTabData;