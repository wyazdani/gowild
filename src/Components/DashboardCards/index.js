import React, { useState, useEffect } from "react";
import { Card, Col, Row, ProgressBar } from "react-bootstrap";
import classes from "./index.module.scss";
import signUpUser from "../../Images/signUpUser.svg";
import activeUser from "../../Images/activeUser.svg";
import inActiveuser from "../../Images/inActiveuser.svg";
import { useDispatch } from "react-redux";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import CardListData from "./CardListData";


const DashboardCard = () => {
  

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const dashboardData = async () => {

        await AuthService.getMethod(ENDPOINT.dashboard, true,)
            .then((res) => {
                setContent(res);
                setIsLoader(true);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    useEffect(() => {
        dashboardData();

    }, []);

    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }


    return (
        <Row>
            <CardListData content={content.data.active_users} title="Active User" image={activeUser} />
            <CardListData content={content.data.inactive_users} title="Inactive User" image={inActiveuser} />
            <CardListData content={content.data.signup_users} title="SignUp User" image={signUpUser} />
        </Row>
    )
}

export default DashboardCard;


