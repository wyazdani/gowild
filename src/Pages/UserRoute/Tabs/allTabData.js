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

    const alltabdata = [
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "active",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "inActive",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
        {
            name: "Miracle Septimus",
            email: "Example@Email.Com",
            route_name: "Miracle Septimus",
            imageUrl: cardimg,
            status: "inActive",
            eventDate: "12/20/2021",
            posted: '11/20/2021'
        },
    ]


    const [content, setContent] = useState([]);
    console.log("🚀 ~ file: allTabData.js:74 ~ AllTabData ~ content", content)
    const [isLoader, setIsLoader] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [search, setSearch] = useState("");


    const userRouteAllData = async () => {
        await AuthService.getMethod(ENDPOINT.users_route.listing, true,)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                console.log("response", res);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        userRouteAllData();
        setIsLoader(true);
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
                                item.user[0].firstName.toLowerCase().includes(search)
                                || item.user[0].lastName.toLowerCase().includes(search)
                                || item.user[0].email.toLowerCase().includes(search)

                            )
                    }).map((content) => (
                        <tr>
                            <td><Form.Check type="checkbox" /></td>
                            <td>
                                <div className={"d-flex"}>
                                    <div className={classes.userImg}>
                                        <img src={content.user[0].picture} alt={content.user[0].firstName} />
                                    </div>
                                    <div className={classes.description}>
                                        <h4 className={"font-16 mb-0"}>{content.user[0].firstName + " " + content.user[0].lastName}</h4>
                                        <div className={"text-muted"}>{content.user[0].email}</div>
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
                                {content.user[0].phoneVerified
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
                                        {content.user[0].phoneVerified
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