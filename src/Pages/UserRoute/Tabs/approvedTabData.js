import {React, useState} from "react";
import {Table,  Dropdown, Button, Row, Col, Form} from "react-bootstrap";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import Tables from "../../../Components/Table";
import cardimg from "Images/userImg.png";
import AddNewCard from "Components/AddNewCard";


const AllTabData = () => {

    const alltabdata = [
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
             route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
             route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
             route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
             route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "inActive",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email:"Example@Email.Com",
             route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "inActive",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
    ]

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
                {alltabdata.map((alltabdata) => (
                    <tr>
                        <td><Form.Check type="checkbox"/></td>
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
                            {alltabdata.route_name}
                        </td>
                        <td>
                            {alltabdata.posted}
                        </td>
                        <td>{alltabdata.eventDate}</td>
                        <td>
                            {alltabdata.status === "active"
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
                                { alltabdata.status === 'Approved'
                                    ?   <Dropdown.Item href="#/">
                                            <i className={"fal fa-ban bg-danger text-white"}></i>
                                            Reject
                                        </Dropdown.Item>
                                    :   <Dropdown.Item href="#/">
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

        </>
    )
}

export default AllTabData;