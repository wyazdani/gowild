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
import Paginations from "Pages/Pagination/Paginations";




const AllTabData = () => {


    const content = [
        {
            id: 1,
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Approved",
            userName: "Miracle",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 2,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            applicationStatus: "Pending",
            userName: "Anikamad",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 3,
            name: "Tayab Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 4,
            name: "Waqas Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 5,
            name: "Hassan Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 6,
            name: "Zain Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 5,
            name: "Bilal Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        {
            id: 6,
            name: "Haris Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
        
    ]



    // const [content, setContent] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [search, setSearch] = useState("");
    const [isLoader, setIsLoader] = useState(false);



    const [currentPage, setCurrentPage] = useState();
    const [employeePerPage] = useState(3);

    const indexOfLastEmployee = currentPage * employeePerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;
    const currentEntries = content.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(content.length / employeePerPage);


    // const treasureWildData = async () => {
    //     await AuthService.getMethod(ENDPOINT.treasure_wild.listing, true,)
    //     .then((res) => {
    //         setContent(res.data);
    //         setIsLoader(true);
    //         console.log("wild" , res.data.data);
    //     })
    //     .catch((err) => {
    //         swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    //     });
    // };


    // useEffect(() => {
    //     treasureWildData();
    //     setIsLoader(true);

    // }, []);

    // if (!isLoader) {
    //     return (
    //         <div className='loader'>
    //             <h3>Loading...</h3>
    //         </div>
    //     );
    // }



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
                    {currentEntries.sort((a, b) => (a.name < b.name ? -1 : 1)).filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : (
                                item.name.toLowerCase().includes(search) ||
                                item.email.toLowerCase().includes(search)
                            )
                    }).map((alltabdata) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={alltabdata.imageUrl} alt={alltabdata.name} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{alltabdata.name}</h4>
                                        <div className={"text-muted"}>{alltabdata.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {alltabdata.eventName}
                            </td>
                            <td>
                                {alltabdata.status
                                    ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                    : <span class={`${classes.tag} ${classes.inactive}`}>InActive</span>
                                }
                            </td>
                            <td>
                                {alltabdata.userName}
                            </td>
                            <td>
                                {alltabdata.applicationStatus === 'Approved' ? <span class="text-success">Approved</span>
                                    : alltabdata.applicationStatus === 'Pending' ? <span class="text-orange">Pending</span>
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

            <Paginations pages={totalPagesNum} setCurrentPage={setCurrentPage} currentEntries={currentEntries} content={content} />


        </>
    )
}

export default AllTabData;