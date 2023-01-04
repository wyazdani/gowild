import React, {useEffect, useState} from "react";
import PageTitle from "../../Components/Pagetitle";
import {Tab, Tabs} from "react-bootstrap";
import AllTabData from "./Tabs/allTabData";
import PendingTabData from "./Tabs/pendingTabData";
import ApproveTabData from "./Tabs/approveTabData";
import DisapproveTabData from "./Tabs/disapproveTabData";
import AuthService from "../../services/auth.service";
import {ENDPOINT} from "../../config/constants";
import swal from "sweetalert";


const TreasureHuntRegistration = () => {

      // const [content, setContent] = useState([]);
    //   const [approveContent, setApproveContent] = useState([]);
    //   const [pendingContent, setPendingContent] = useState([]);
    //   const [disapproveContent, setDisapproveContent] = useState([]);
    //   const [isLoader, setIsLoader] = useState(false);

         // const treasureWildData = async () => {
    //     await AuthService.getMethod(ENDPOINT.treasure_wild.listing, true,)
    //     .then((res) => {
    //         setContent(res.data);
                // setApproveContent(res.data);
                // setPendingContent(res.data);
                // setDisapproveContent(res.data);
    //         setIsLoader(true);
    //         console.log("wild" , res.data.data);
    //     })
    //     .catch((err) => {
    //         swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    //     });
    // };


    // useEffect(() => {
    //     treasureWildData();
    //     setIsLoader(true);

    // }, []);

    // if (!isLoader) {
    //     return (
    //         <div className='loader'>
    //             <h3>Loading...</h3>
    //         </div>
    //     );
    // }


    return(
        <>
            <PageTitle title={"Thrill Seekers Attraction in Houston"} />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData />
                    </Tab>
                    <Tab eventKey="Approve" title="Approve">
                        <ApproveTabData />
                    </Tab>
                    <Tab eventKey="Pending" title="Pending">
                        <PendingTabData />
                    </Tab>
                    <Tab eventKey="Disapprove" title="Disapprove">
                        <DisapproveTabData />
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}

export default TreasureHuntRegistration;