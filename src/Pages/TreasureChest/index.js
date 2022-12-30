import React, { useState, useEffect } from 'react';
import PageTitle from "../../Components/Pagetitle";
import imgURL from "../../Images/treasureChest.png";
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from 'react-router-dom';
import EditTreasure from './EditTreasureChests';
import ViewRoute from 'Pages/UserRoute/viewRoute';
import ViewTreasure from './ViewRoute';
// import ViewTreasure from './ViewRoute/ViewRoute';



const TreasureChestList = () => {
    let { id } = useParams();



    const navigate = useNavigate();
    const goToCreateRoute = () => {
        navigate('/treasure-list/create');
    };
    const goToEditRoute = () => {
        navigate('/treasure-list/edit');
        // history.push(`/edit-form?id=${id}`);
    };

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    const [addAdmin, setAddAdmin] = useState(false);
    const [editSubAdmin, setEditSubAdmin] = useState(false);
    const [viewTreasureChests, setViewTreasureChests] = useState(false);
    const [search, setSearch] = useState("");
    const [editItem, setEditItem] = useState(null);
    const [viewItem, setViewItem] = useState(null);


    const treasureChestsListData = async (data) => {
        await AuthService.getMethod(ENDPOINT.treasure_chests.listing, data, true)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                console.log(res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };



    const deleteTreasureChests = async (id) => {
        ENDPOINT.treasure_chests.delete.id = id;
        await AuthService.deleteMethod(ENDPOINT.treasure_chests.delete.url + ENDPOINT.treasure_chests.delete.id, true)
            .then((res) => {
                treasureChestsListData();
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        treasureChestsListData();

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

        return [month, day, year].join('.');
    }


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }




    return (
        <>
            <PageTitle title="Treasure Chests List" />
            <section className={"section"}>
                <div className={"d-md-flex item-center-between mb-3"}>
                    <h4 className={"my-2"}>Treasure Chest Lists</h4>
                    <Button onClick={goToCreateRoute}>Create</Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check type="checkbox" />
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Date Created</th>
                            <th>Event Date</th>
                            <th>Starting Point/Lat</th>
                            <th>Starting Point/Long</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((content) => (
                            <tr>
                                <td><Form.Check type="checkbox" /></td>
                                <td style={{width:"10%"}}>
                                    <img src={"https://api.gowild.appscorridor.com" + content.picture} width="100%" alt={"img"} />
                                </td>
                                <td>{content.title}</td>
                                <td>{(formatDate(content.createdDate))}</td>
                                <td> {(formatDate(content.eventDate))}</td>
                                <td>{content.location.latitude}</td>
                                <td>{content.location.longitude}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <i className={"far fa-ellipsis-v fa-fw"}></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/" 
                                           onClick={
                                                    () => {
                                                        setViewTreasureChests(true)
                                                        setViewItem(content)
                                                    }}
                                                    >
                                                <i className={"fal fa-ban bg-warning text-white"}></i>
                                                View
                                                
                                            </Dropdown.Item>
                                         
                                            <Dropdown.Item href="#/"
                                                onClick={
                                                    () => {
                                                        setEditSubAdmin(true)
                                                        setEditItem(content)
                                                    }}

                                            >
                                                <i className={"far fa-pen bg-dark text-white"}></i>
                                                Edit User
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/" onClick={() => {
                                                deleteTreasureChests(content.id)
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
                
            </section>


            <ViewTreasure
                show={viewTreasureChests}
                onHide={() => setViewTreasureChests(false)}
                viewItem={viewItem}
            />

            <EditTreasure
                show={editSubAdmin}
                onHide={() => setEditSubAdmin(false)}
                editItem={editItem}
            />

         
        </>
    )
}

export default TreasureChestList;
