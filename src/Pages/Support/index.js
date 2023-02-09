import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import userImg from "../../Images/userImg.png";
import {Form} from "reactstrap";
import AuthService from "../../services/auth.service";
import {ENDPOINT} from "../../config/constants";
import swal from "sweetalert";
import Inbox from "./Inbox/Inbox";

const Support =(props) => {
    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const supportTickets  = async () => {
        await AuthService.getMethod(ENDPOINT.support.tickets, true,)
            .then((res) => {
                setContent(res.data)
                setTimeout(()=>{
                    setIsLoader(true)
                }, 500);


            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };
    useEffect( () => {
         supportTickets()
    }, []);

    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }
    return(
        <>
            <PageTitle title={"Support"} />
            <section className={"section"}>
                <div className={classes.supportblock}>
                    <Inbox content={content} />
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