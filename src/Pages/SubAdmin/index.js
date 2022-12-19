import React from "react";
import {Tabs, Tab} from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import AllTabData from "./Tabs/allTabData";
import ActiveTabData from "./Tabs/activeTabData";
import InActiveTabData from "./Tabs/inActiveTabData";

const SubAdmin = () => {
    return (
        <>
            <PageTitle title="Sub Admin" />
            <section className={"section"}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                >
                    <Tab eventKey="All" title="All">
                        <AllTabData />
                    </Tab>
                    <Tab eventKey="Active" title="Active">
                        <ActiveTabData />
                    </Tab>
                    <Tab eventKey="Inactive" title="Inactive">
                       <InActiveTabData />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
};

export default SubAdmin;
