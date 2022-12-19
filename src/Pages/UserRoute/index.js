import React from "react";
import {Tabs, Tab} from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import ApprovedTabData from "./Tabs/approvedTabData";
import RejectTabData from "./Tabs/rejectTabData";

const UserRoute = () => {
    return (
        <>
            <PageTitle title="End-User's Routes" />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData />
                    </Tab>
                    <Tab eventKey="Approved" title="Approved">
                        <ApprovedTabData />
                    </Tab>
                    <Tab eventKey="Reject" title="Reject">
                        <RejectTabData />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
};

export default UserRoute;
