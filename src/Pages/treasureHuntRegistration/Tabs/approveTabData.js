import {React, useState} from "react";
import {Form, Dropdown, Row, Col, Button} from "react-bootstrap";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import {Link} from "react-router-dom";
import Tables from "../../../Components/Table";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import ViewProfilePopup from "./viewProfilePopup";


const ApproveTabData = () => {

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
                            <Link to={"/treasure-hunt/approved"} className={"flagBox"}>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1_1945)">
                                        <path d="M29.6202 0H8.38059C7.76594 0 7.26709 0.498104 7.26709 1.1135V4.47106H30.7337V1.1135C30.7337 0.498104 30.2348 0 29.6202 0Z" fill="white"/>
                                        <path d="M22.5823 18.669L24.035 17.2163V22.3577H13.9661V17.2163L15.4188 18.669C15.8805 19.1307 16.6407 19.0991 17.0616 18.594L19.0006 16.2676L20.9395 18.594C21.3592 19.0976 22.1193 19.132 22.5823 18.669Z" fill="white"/>
                                        <path d="M7.26727 6.69849V36.8854C7.26727 37.742 8.19667 38.2787 8.939 37.8489L19.0006 32.0239L29.0621 37.8489C29.803 38.2787 30.7338 37.7428 30.7338 36.8854V6.69849H7.26727ZM26.262 23.4715C26.262 24.0861 25.7639 24.5849 25.1485 24.5849H12.8526C12.2372 24.5849 11.7391 24.0861 11.7391 23.4715V14.5279C11.7391 13.5399 12.9385 13.0401 13.6394 13.741L16.1314 16.2322L18.1454 13.8152C18.5905 13.2811 19.4105 13.281 19.8557 13.8152L21.8697 16.2322L24.3617 13.741C25.063 13.0396 26.262 13.5405 26.262 14.5279V23.4715Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1_1945">
                                            <rect width="38" height="38" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
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
            applicationStatus: "Approved",
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

export default ApproveTabData;