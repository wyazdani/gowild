import React, {useState, useEffect} from "react";
import {Table, Form, Dropdown} from "react-bootstrap";
import  classes from "../../treasureHuntRegistration/index.module.scss";
import AuthService from "../../../services/auth.service";
import {ENDPOINT} from "../../../config/constants";
import swal from "sweetalert";


const ActiveTabData = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowView, setModalShowView] = useState(false);

    const [search , setSearch] = useState("");



    return(
        <>
            <Table>
                <thead>
                <tr>
                    <th colSpan={0}>
                        <Form.Check type="checkbox" />
                    </th>
                    <th>Name</th>
                    <th>Online status</th>
                    <th>Username</th>
                    <th>account Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    props.content.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : (
                                item.email.toLowerCase().includes(search)
                            )
                    })
                        .map((content) => (
                            <tr>
                                <td>
                                    <Form.Check type="checkbox" />
                                </td>
                                <td>
                                    <div className={"d-flex"}>
                                        <div className={classes.userImg}>
                                            <img src={content.imageUrl} alt={content.name}/>
                                        </div>
                                        <div className={classes.description}>
                                            <h4 className={"font-16 mb-0"}>{content.name}</h4>
                                            <div className={"text-muted"}>{content.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {content.onlineStatus === true
                                        ? <span className={`${classes.tag} ${classes.active}`}>Active</span>
                                        : <span className={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                    }
                                </td>
                                <td>{content.location}</td>
                                <td>
                                    {content.accountStatus === "active"
                                        ? <span className="text-success">Active</span>
                                        : <span className="text-danger">Disabled</span>
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
                        ))
                }
                </tbody>
            </Table>
        </>
    )
}

export default ActiveTabData;