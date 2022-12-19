import {React} from "react";
import PageTitle from "../../Components/Pagetitle";
import {Tab, Tabs} from "react-bootstrap";
import AllTabData from "./Tabs/allTabData";
import PendingTabData from "./Tabs/pendingTabData";
import ApproveTabData from "./Tabs/approveTabData";
import DisapproveTabData from "./Tabs/disapproveTabData";

const TreasureHuntRegistration = () => {
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