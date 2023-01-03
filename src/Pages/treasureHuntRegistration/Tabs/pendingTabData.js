
import { React, useState } from "react";
import  classes from "../index.module.scss";
import userImg from "../../../Images/userImg.png";
import { Form, Dropdown, Row, Col, Button ,Table} from "react-bootstrap";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import ViewProfilePopup from "./viewProfilePopup";


const PendingTabData = () => {
    const alltabdata = [
        {
            id: 1,
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "pending",
            userName: "Miracle",
        },
        {
            id: 2,
            name: "Anika Rhiel Madsen",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            location: "Alberta, CA",
            applicationStatus: "pending",
            userName: "Anikamad",
        },
        {
            id: 3,
            name: "Marco Vaccaro",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            location: "Alberta, CA",
            applicationStatus: "pending",
            userName: "Marcoro",
        },
    ]


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
                        <th>Online Status</th>
                        <th>Username</th>
                        <th>Application Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {alltabdata.map((alltabdata) => (
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
                                    : alltabdata.applicationStatus === 'pending' ? <span class="text-orange">Pending</span>
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

        </>
    )
}

export default PendingTabData;