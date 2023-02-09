import React, {useEffect} from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import userImg from "../../Images/userImg.png";
import {Form} from "reactstrap";

const Support =(props) => {
    useEffect(() => {
        console.log('Here')
    }, []);
    return(
        <>
            <PageTitle title={"Support"} />
            <section className={"section"}>
                <div className={classes.supportblock}>
                    <div className={classes.messageListSidebar}>
                        <form className={classes.searchform}>
                            <div className="form-group">
                                <input type="search" className="form-control" placeholder="Search Message" />
                            </div>
                        </form>
                        <ul>
                            <li className="active">
                                <div className={classes.userImg}>
                                    <img src={userImg} alt="username"/>
                                </div>
                                <div className={classes.description}>
                                    <h6>Marcus Curtis</h6>
                                    <div className="text-muted">
                                        <time>5min</time>
                                        <div className={classes.text}>
                                            Lorem IPSUM DOLOR Lorem IPSUM DOLOR
                                        </div>
                                    </div>
                                    <span className={classes.counter}>2</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.msgPreview}>
                        <div className={classes.chatheader}>
                            <div className={classes.userInfo}>
                                <div className={classes.userImg}>
                                    <img src={userImg} alt="username"/>
                                </div>
                                <div className={classes.description}>
                                    <h6>Marcus Curtis</h6>
                                    <small className={classes.text}>marcuscurtis01@gmail.com</small>
                                </div>
                            </div>

                        </div>
                        <div className={classes.mesgs}>
                            <div className={classes.msghistory}>
                                <div className={classes.incoming}>
                                    <div className={classes.userImg}>
                                        <img src={userImg} alt="username"/>
                                    </div>
                                    <div className={classes.description}>
                                        <div className={classes.text}>Test which is a new approach to have all
                                            solutions
                                            <div className={classes.time}> 11:01 AM</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.outgoing}>
                                    <div className={classes.userImg}>
                                        <img src={userImg} alt="username"/>
                                    </div>
                                    <div className={classes.description}>
                                        <div className={classes.text}>Test which is a new approach to have all
                                            solutions
                                        </div>
                                        <div className={classes.time}> 11:01 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.typemsg}>
                                <div className={classes.btngroup}>
                                    <button type="button" className={classes.btn}><i className="fal fa-paperclip"></i></button>
                                    <button type="button" className={classes.btn}><i className="fal fa-image"></i></button>
                                </div>
                                <input type="text" className={classes.formcontrol} placeholder="Type a message"/>
                                <button className={`${classes.btn} ${classes.btnSend}`} type="button"><i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Support;