import React, { useEffect, useState } from "react";
import PageTitle from "../../Components/Pagetitle";
import { Tab, Tabs } from "react-bootstrap";
import AllTabData from "./Tabs/allTabData";
import PendingTabData from "./Tabs/pendingTabData";
import ApproveTabData from "./Tabs/approveTabData";
import DisapproveTabData from "./Tabs/disapproveTabData";
import AuthService from "../../services/auth.service";
import { ENDPOINT } from "../../config/constants";
import swal from "sweetalert";


const TreasureHuntRegistration = () => {

    const [content, setContent] = useState([]);
    const [approveContent, setApproveContent] = useState([]);
    const [pendingContent, setPendingContent] = useState([]);
    const [disapproveContent, setDisapproveContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const treasureWildData = async () => {
        await AuthService.getMethod(ENDPOINT.treasure_chests.listing_hunt, true,)
            .then((res) => {
                let content = res.data.filter(obj => {
                    if (obj.status === "approved") {
                        return obj
                    }
                });

                let pending = res.data.filter(obj => {
                    if (obj.status === "pending") {
                        return obj
                    }
                });
                let disapprove = res.data.filter(obj => {
                    if (obj.status === "disapprove") {
                        return obj
                    }
                });

        
                setContent(res.data);
                setApproveContent(content);
                setPendingContent(pending);
                setDisapproveContent(disapprove);
                setIsLoader(true);
                console.log("wild", res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };


    useEffect(() => {
        treasureWildData();

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
            <PageTitle title={"Thrill Seekers Attraction in Houston"} />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData content={content} />
                    </Tab>
                    <Tab eventKey="Approve" title="Approve">
                        <ApproveTabData content={approveContent} />
                    </Tab>
                    <Tab eventKey="Pending" title="Pending">
                        <PendingTabData content={pendingContent} />
                    </Tab>
                    <Tab eventKey="Disapprove" title="Disapprove">
                        <DisapproveTabData content={disapproveContent} />
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}

export default TreasureHuntRegistration;