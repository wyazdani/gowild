import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "../index.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import userImg from "../../../Images/userImg.png";
import {imageUrl, timeSince} from "../../../Helper/Helpers";

const Messages = (props) => {
    // const { content } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        handleChange(props)
    }, []);

    useEffect(() => {
        handleChange(props)
    }, [props]);

    const handleChange = (props) => {
        setCurrentItems(props.message?.data)
        setTicket(props.rowUser)
    }

    return (
        <>
            <div className={classes.msgPreview}>
                <div className={classes.chatheader}>
                    <div className={classes.userInfo}>
                        <div className={classes.userImg}>
                            <img key={ticket?.id} src={imageUrl(ticket?.user?.picture,userImg)} alt="username"/>
                        </div>
                        <div className={classes.description}>
                            <h6>{`${ticket?.user?.firstName} ${ticket?.user?.lastName}`}</h6>
                            <small className={classes.text}>{ticket?.user?.email}</small>
                        </div>
                    </div>

                </div>
                <div className={classes.mesgs}>
                    <div className={classes.msghistory}>
                        {currentItems.map((data) => (
                            <div key={data?.id} className={data?.role==='user'?classes.incoming:classes.outgoing}>
                                <div className={classes.userImg}>
                                    <img key={data?.id} src={imageUrl(data?.user?.picture,userImg)} alt="username"/>
                                </div>
                                <div className={classes.description}>
                                    <div className={classes.text}>{data?.message}
                                        <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
        </>
    )
}

export default Messages;