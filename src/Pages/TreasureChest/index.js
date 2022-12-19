import {React} from "react";
import PageTitle from "../../Components/Pagetitle";
import { Form, Table} from "react-bootstrap";
import imgURL from "../../Images/treasureChest.png";



const TreasureChestList = () => {
    const treasureChest = [
        {
            name: "First On The List",
            imageUrl: imgURL,
            dateCreated: "09.10.21",
            eventDate: "09.18.21",
        },
        {
            name: "Still Raid",
            imageUrl: imgURL,
            dateCreated: "09.10.21",
            eventDate: "09.18.21",
        },
        {
            name: "Obstacle Chase",
            imageUrl: imgURL,
            dateCreated: "09.10.21",
            eventDate: "09.18.21",
        },
        {
            name: "Voidhoop",
            imageUrl: imgURL,
            dateCreated: "09.10.21",
            eventDate: "09.18.21",
        },


    ]
    return(
        <>
            <PageTitle title="Treasure Chests List" />
            <section className={"section"}>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            <Form.Check type="checkbox" />
                        </th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Event Data</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {treasureChest.map((treasureChest) => (
                        <tr>
                            <td><Form.Check type="checkbox"/></td>
                            <td>
                                <img src={treasureChest.imageUrl} alt={"img"} />
                            </td>
                            <td>{treasureChest.name}</td>
                            <td>{treasureChest.dateCreated}</td>
                            <td>{treasureChest.eventDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </section>
        </>
    )
}

export default TreasureChestList;
