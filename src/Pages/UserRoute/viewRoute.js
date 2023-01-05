import React from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import mapImg from "../../Images/wallstreetMapImg.jpg";
import userImg from "../../Images/userImg.png";
import {Button} from "react-bootstrap";


const ViewRoute = (props) => {
    return(
        <>
            <PageTitle title="Wall Street" />
            <section className={"section"}>
                <div className={classes.mapBox}>
                    <img src={mapImg} alt={"map-img"} />
                </div>
                <ul className={classes.mapDetail}>
                    <li>
                        <strong>Route Name</strong>
                        <span className={"text-muted"}>Wall Street</span>
                    </li>
                    <li>
                        <strong>Starting Point</strong>
                        <span className={"text-muted"}>51.2345/32.535</span>
                    </li>
                    <li>
                        <strong>end Point</strong>
                        <span className={"text-muted"}>69.7345</span>
                    </li>
                    <li>
                        <div className={classes.userInfo}>
                            <div className={classes.userImg}>
                                <img src={userImg} alt={"userName"} />
                            </div>
                            <h6>Jennylyn Artecona</h6>
                        </div>
                    </li>
                </ul>
                <div className={"text-center"}>
                    <Button variant={"danger m-3"}>Reject</Button>
                    <Button variant={"success m-3"}>Approve</Button>
                </div>
            </section>
        </>
    )
}

export default ViewRoute;