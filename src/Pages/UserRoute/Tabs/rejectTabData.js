import {React, useState} from "react";
import { Form, Dropdown, Button, Row, Col} from "react-bootstrap";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import Tables from "../../../Components/Table";


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
            dataField: 'routename',
            text: 'Route Name'
        },
        {
            dataField: 'dateposted',
            text: 'Date Posted'
        },
        {
            dataField: 'eventDate',
            text: 'Event Date'
        },
        {
            dataField: 'status',
            text: 'Status',
            formatter: function(cell,row){
                return (
                    <>
                        {   row.status === 'Approved' ? <span class="text-success">Approved</span>
                            : row.status === 'Pending' ? <span class="text-orange">Pending</span>
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
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <i className={"far fa-ellipsis-v fa-fw"}></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                { row.status === 'Approved'
                                    ?   <Dropdown.Item href="#/">
                                        <i className={"fal fa-ban bg-danger text-white"}></i>
                                        Reject
                                    </Dropdown.Item>
                                    :   <Dropdown.Item href="#/">
                                        <i className={"fal fa-check bg-success text-white"}></i>
                                        Approve
                                    </Dropdown.Item>
                                }
                                <Dropdown.Item href="#/" onClick={() => setModalShowView(true)}>
                                    <i className={"fal fa-eye bg-dark text-white"}></i>
                                    View
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
            dateposted: "11/20/2021",
            eventDate: "12/20/2021",
            status: "Approved",
            routename: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            accountstatus: true,
        },
        {
            id: 2,
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            dateposted: "11/20/2021",
            eventDate: "12/20/2021",
            status: "Pending",
            routename: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            accountstatus: true,
        },
        {
            id: 3,
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            dateposted: "11/20/2021",
            eventDate: "12/20/2021",
            status: "Rejected",
            routename: "THRILL SEEKERS ATTRACTIONS IN HOUSTON",
            accountstatus: true,
        },
    ];



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
                    </Row>
                </Form>
            </div>
            <Tables
                data={data}
                columns={columns}
            />

        </>
    )
}

export default AllTabData;