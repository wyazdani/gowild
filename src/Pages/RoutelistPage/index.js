import {React} from "react";
import PageTitle from "../../Components/Pagetitle";
import {Button, Dropdown, Form, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import imgURL from "../../Images/routelist.png";


const RouteList = () => {
    const navigate = useNavigate();
    const goToCreateRoute = () => {
        navigate('/route-list/create');
    };

    const routeList = [
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.16.21",
            startingPoint: "32.4832°/12.4233°",
            endpoint: "65.5234°/12.4233°"
        },
    ]
    return(
        <>
            <PageTitle title="Normal Route" />
            <section className={"section"}>
                <div className={"d-md-flex item-center-between mb-3"}>
                    <h4 className={"my-2"}>Route List</h4>
                    <Button onClick={goToCreateRoute}>Create</Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <Form.Check type="checkbox" />
                            </th>
                            <th>Name</th>
                            <th>Date created</th>
                            <th>Starting point Long / Lat</th>
                            <th>End  point Long / Lat</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {routeList.map((routeList) => (
                        <tr>
                            <td>
                                <Form.Check type="checkbox" />
                            </td>
                            <td>
                                <img src={routeList.imageUrl} alt={"img"} />
                            </td>
                            <td>{routeList.name}</td>
                            <td>{routeList.dateCreated}</td>
                            <td>{routeList.startingPoint}</td>
                            <td>{routeList.endpoint}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <i className={"far fa-ellipsis-v fa-fw"}></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/">
                                            <i className={"fal fa-eye  bg-light-yellow text-white"}></i>
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/">
                                            <i className={"far fa-pen bg-dark text-white"}></i>
                                            Edit
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
            </section>
        </>
    )
}

export default RouteList;