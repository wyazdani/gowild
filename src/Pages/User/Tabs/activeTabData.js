import React from "react";
import {Table, Form, Dropdown} from "react-bootstrap";
import  classes from "../../treasureHuntRegistration/index.module.scss";
import userImg from "../../../Images/userImg.png";


const ActiveTabData = () => {
    const alltabdata = [
        {
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            username: "Miracleist",
            accountstatus: true,
        },
        {
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            username: "Miracleist",
            accountstatus: true,
        },
        {
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            username: "Miracleist",
            accountstatus: false,
        },
        {
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: false,
            username: "Miracleist",
            accountstatus: false,
        },
        {
            name: "Miracle Septimus",
            imageUrl: userImg,
            email: "example@email.com",
            status: true,
            username: "Miracleist",
            accountstatus: true,
        },
    ]
    return(
        <>
            <Table>
                <thead>
                <tr>
                    <th>
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
                                {alltabdata.status
                                    ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                    : <span class={`${classes.tag} ${classes.inactive}`}>Disable</span>
                                }
                            </td>
                            <td>{alltabdata.username}</td>
                            <td>
                                {alltabdata.accountstatus
                                    ? <span class="text-success">Active</span>
                                    : <span class="text-danger">InActive</span>
                                }
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <i className={"far fa-ellipsis-v fa-fw"}></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/">
                                            <i className={"fal fa-ban bg-warning text-white"}></i>
                                            Disable User
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            <i className={"far fa-pen bg-dark text-white"}></i>
                                            Edit User
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            <i className={"fal fa-trash bg-danger text-white"}></i>
                                            Delete
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

export default ActiveTabData;