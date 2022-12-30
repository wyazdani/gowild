import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "./index.module.scss";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import EditSubAdmin from "../../../Components/SubAdminComponent/EditSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';



const AllTabData = () => {



    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [editSubAdmin, setEditSubAdmin] = useState(false);
    const [search , setSearch] = useState("");
    const [editItem , setEditItem] = useState(null);



     const subAdminAllData = async () => {
         await AuthService.getMethod(ENDPOINT.sub_admin.listing, true,)
         .then((res) => {
             setContent(res.data);
             setIsLoader(true);
             //console.log(res.data);
         })
         .catch((err) => {
             swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
         });
     };

    const deleteSubAdmin = async (id) => {
        ENDPOINT.sub_admin.delete.id = id;
        await AuthService.deleteMethod(ENDPOINT.sub_admin.delete.url+ENDPOINT.sub_admin.delete.id, true)
        .then((res) => {
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
                            <Button onClick={() => setAddAdmin(true)}>
                                Add New
                            </Button>
                            <AddSubAdmin
                                show={addAdmin}
                                onHide={() => setAddAdmin(false)}
                            />
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
                        <th>Online status</th>
                        <th>Username</th>
                        <th>account Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        content.filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : (
                                    item.firstName.toLowerCase().includes(search) ||
                                    item.email.toLowerCase().includes(search) ||
                                    item.lastName.toLowerCase().includes(search)
                                )
                        })
                            .map((content) => (
                                <tr>
                                    <td><Form.Check type="checkbox" /></td>
                                    <td>
                                        <div className={"d-flex"}>
                                            <div className={classes.userImg}>
                                                <img src={content.picture} alt={content.firstName} />
                                            </div>
                                            <div className={classes.description}>
                                                <h4 className={"font-16 mb-0"}>{content.firstName+" "+content.lastName}</h4>
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
                                                <Dropdown.Item href="#/" onClick={
                                                    () => {
                                                        setEditSubAdmin(true)
                                                        setEditItem(content)
                                                    }
                                                }>
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
                            ))
                    }
                </tbody>
            </Table>
            <EditSubAdmin
                show={editSubAdmin}
                onHide={() => setEditSubAdmin(false)}
                editItem={editItem}
            />
            
        </>
    )
}

export default AllTabData;