import { React, useState, useEffect } from "react";
import { Table, Dropdown, Button, Row, Col, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import cardimg from "Images/userImg.png";
import AddSubAdmin from "../../../Components/SubAdminComponent/AddNewSubAdmin";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';

const AllTabData = () => {


    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [search, setSearch] = useState("");


    const userRouteAllData = async () => {
        await AuthService.getMethod(ENDPOINT.users_route.listing, true,)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                // console.log("response data", res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        userRouteAllData();
    }, []);



    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }



    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }

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
                    {content.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : (
                                item.user.firstName.toLowerCase().includes(search) ||
                                item.user.lastName.toLowerCase().includes(search)  ||
                                item.user.email.toLowerCase().includes(search) 
                            )
                    }).map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={content.user.picture} alt={content.user.firstName} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.user.firstName + " " + content.user.lastName}</h4>
                                        <div className={"text-muted"}>{content.user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {content.title}
                            </td>
                            <td>
                                {(formatDate(content.updatedDate))}
                            </td>
                            <td>
                                {(formatDate(content.createdDate))}
                            </td>
                            <td>
                                {content.user.status.statusName === "active"
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
                                        {content.user.status.statusName === "active"
                                            ? <Dropdown.Item href="#/">
                                                <i className={"fal fa-ban bg-danger text-white"}></i>
                                                Reject
                                            </Dropdown.Item>
                                            : <Dropdown.Item href="#/">
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