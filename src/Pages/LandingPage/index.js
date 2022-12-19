import React from "react";
import {Tabs, Tab, Button, Form} from 'react-bootstrap';
import PageTitle from "../../Components/Pagetitle";
import DashboardCard from "../../Components/DashboardCards";
import chartImg from "Images/chartImg.png";
import classes from "./index.module.scss";

const LandingPage = () => {





  return (
    <>
        <PageTitle title="Home" />

        <section className={"section mb-5"}>
            <DashboardCard />
        </section>
        <section className={"section"}>
            <div className={classes.btnRow}>
                <Button variant="secondary">Download CSV</Button>
                <Form.Control type="date" placeholder="dd/mm/yyyy" />
            </div>
            <Tabs
                defaultActiveKey="newuser"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="newuser" title="New User">
                    <img className={"img-fluid"} src={chartImg} alt={"img"} />
                </Tab>
                <Tab eventKey="online" title="Online">
                    <img className={"img-fluid"} src={chartImg} alt={"img"} />
                </Tab>
                <Tab eventKey="banned" title="Banned">
                    <img className={"img-fluid"} src={chartImg} alt={"img"} />
                </Tab>
            </Tabs>
        </section>
    </>
  );
};

export default LandingPage;
