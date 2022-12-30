import React, {useState, useEffect} from "react";
import { Form, Dropdown, Button, Row, Col, Table} from "react-bootstrap";
import  classes from "../../treasureHuntRegistration/index.module.scss";
import ViewProfilePopup from "../UserComponent/ViewProfile/viewProfilePopup";
import EditUser from "../UserComponent/EditUser";
import AddUser from "../UserComponent/AddNewUser";



const AllTabData = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);
    const [modalEditUser, setModalEditUser] = useState(false);
    const [editItem , setEditItem] = useState(null);
    const [search , setSearch] = useState("");



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
                                    <Form.Control type="search" placeholder="Search Users by Name or Email" onChange={(e) => setSearch(e.target.value)} />
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
            <Table>
                <thead>
                    <tr>
                        <th><Form.Check type="checkbox" /></th>
                        <th>Name</th>
                        <th>Online Status</th>
                        <th>Location</th>
                        <th>Account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.content.filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : (
                                    item.email.toLowerCase().includes(search) ||
                                    item.firstName.toLowerCase().includes(search) ||
                                    item.lastName.toLowerCase().includes(search)
                                )
                        })
                            .map((content) => (
                    <tr>
                    <td><Form.Check type="checkbox" /></td>
                        <td>
                            <div className={"d-flex"}>
                                <div className={classes.userImg}>
                                    <img src={content.imageUrl} alt={content.firstName} />
                                </div>
                                <div className={classes.description}>
                                    <h4 className={"font-16 mb-0"}>{content.firstName+" "+content.lastName}</h4>
                                    <div className={"text-muted"}>{content.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {content.onlineStatus === true
                                ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                            }
                        </td>
                        <td>{content.location}</td>
                        <td>
                            {content.accountStatus === "active"
                                ? <span class="text-success">Active</span>
                                : <span class="text-danger">Disabled</span>
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
                                    <Dropdown.Item href="#/" onClick={
                                        () => {
                                            setModalShowView(true)
                                            setEditItem(content)
                                        }
                                    }>
                                        <i className={"fal fa-user bg-dark text-white"}></i>
                                        View Profile
                                    </Dropdown.Item>
                                   {/* <Dropdown.Item href="#/" onClick={
                                        () => {
                                            setModalEditUser(true)
                                            console.log(content)
                                            setEditItem(content)
                                        }
                                    }>
                                        <i className={"far fa-pen bg-dark text-white"}></i>
                                        Edit User
                                    </Dropdown.Item>*/}
                                    {/*<Dropdown.Item href="#/" onClick={() => {
                                        props.deleteSubAdmin(content.id)
                                    }}>
                                        <i className={"fal fa-trash bg-danger text-white"}></i>
                                        Delete
                                    </Dropdown.Item>*/}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                            ))
                    }
                </tbody>
            </Table>


            {/*<EditUser
                show={modalEditUser}
                onHide={() => setModalEditUser(false)}
                editItem={editItem}
            />*/}

            <AddUser
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <ViewProfilePopup
                show={modalShowView}
                onHide={() => setModalShowView(false)}
                editItem={editItem}

            />
        </>
    )
}

export default AllTabData;