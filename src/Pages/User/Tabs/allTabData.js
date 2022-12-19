import {React, useState} from "react";
import { Form, Dropdown, Button, Row, Col} from "react-bootstrap";
import  classes from "../../treasureHuntRegistration/index.module.scss";
import userImg from "../../../Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import Tables from "../../../Components/Table";
import ViewProfilePopup from "./viewProfilePopup";


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
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'acountStatus',
            text: 'Account Status',
            formatter: function(cell,row){
                return (
                    <>
                        {row.accountstatus===true
                            ? <span class="text-success">Active</span>
                            : <span class="text-danger">Disabled</span>
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
            accountstatus: true,
        },
        {
            id: 2,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },
        {
            id: 3,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },
        {
            id: 4,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 5,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 6,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 7,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 8,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 9,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },        {
            id: 10,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },
        {
            id: 11,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
        },
        {
            id: 12,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            accountstatus: false,
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
                            <Button onClick={() => setModalShow(true)}>
                                Add New
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