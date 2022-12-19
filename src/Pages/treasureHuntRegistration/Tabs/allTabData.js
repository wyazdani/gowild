import {React, useState} from "react";
import { Form, Dropdown, Button, Row, Col} from "react-bootstrap";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import Tables from "../../../Components/Table";
import ViewProfilePopup from "../Tabs/viewProfilePopup";
import {Link} from "react-router-dom";


const AllTabData = () => {

    const columns = [

        {
            dataField: 'name',
            text: 'Name',
            formatter: function(cell,row){
                return (
                    <>
                        <div className={"d-flex"}>
                            <div className={classes.userImg}>
                                <img src={row.imageUrl} alt={row.name} />
                            </div>
                            <div className={classes.description}>
                                <h4 className={"font-16 mb-0"}>{row.name}</h4>
                                <div className={"text-muted"}>{row.email}</div>
                            </div>
                        </div>
                    </>
                )
            }
        },
        {
            dataField: 'eventName',
            text: 'Event Name'
        },
        {
            dataField: 'status',
            text: 'Online Status',
            formatter: function(cell,row){
                return (
                    <>
                        {row.status===true
                            ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                            : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                        }
                    </>
                )
            }
        },
        {
            dataField: 'userName',
            text: 'User Name'
        },
        {
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'applicationStatus',
            text: 'Application Status',
            formatter: function(cell,row){
                return (
                    <>
                        {   row.applicationStatus === 'Approved' ? <span class="text-success">Approved</span>
                            : row.applicationStatus === 'Pending' ? <span class="text-orange">Pending</span>
                                : <span class="text-danger">Rejected</span>
                        }
                    </>
                )
            }

        },
        {
            dataField: 'action',
            text: '',
            formatter: function(cell,row){
                return (
                    <>
                        <div className={classes.dataBox}>
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
                        </div>
                    </>
                )
            }
        },
    ];

    const data = [
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
            name: "Marco Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "Rejected",
            userName: "Marcoro",
            eventName: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
        },
    ];



    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);


    return(
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
                                    <Form.Control type="search" placeholder="Search Users by Name, Email or Date" />
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
            <Tables
                data={data}
                columns={columns}
            />
            <AddSubAdmin
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ViewProfilePopup
                show={modalShowView}
                onHide={() => setModalShowView(false)}
            />

        </>
    )
}

export default AllTabData;