import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown } from "react-bootstrap";
import classes from "./index.module.scss";
import AuthService from "../../../services/auth.service";
import {ENDPOINT} from "../../../config/constants";
import swal from "sweetalert";
import accessHeader from "../../../services/headers/access-header";



const ActiveTabData = () => {

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [search , setSearch] = useState("");


    const subAdminAllData = async () => {
        await AuthService.getMethod(ENDPOINT.sub_admin.active, true,)
            .then((res) => {
                setContent(res.data);
                setIsLoader(true);
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    const deleteSubAdmin = async (id) => {
        ENDPOINT.sub_admin.delete.id = id;
        await AuthService.deleteMethod(ENDPOINT.sub_admin.delete.url+ENDPOINT.sub_admin.delete.id, accessHeader(),)
            .then((res) => {
                setContent(res.data);
                // setIsLoader(true);
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    useEffect(() => {
        subAdminAllData();
        setIsLoader(true);

    }, []);



    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
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
                    {content.map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={content.picture} alt={content.name} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.name}</h4>
                                        <div className={"text-muted"}>{content.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.onlineStatus
                                    ? <span class={`${classes.tag} ${classes.active}`}>Active</span>
                                    : <span class={`${classes.tag} ${classes.inactive}`}>Inactive</span>
                                }
                            </td>
                            <td>{content.username}</td>
                            <td>
                                {content.accountStatus === "active"
                                    ? <span class="text-success">Active</span>
                                    : <span class="text-danger">inactive</span>
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
                                        <Dropdown.Item href="#/" onClick={() => {
                                                deleteSubAdmin(content.id)
                                            }}>
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