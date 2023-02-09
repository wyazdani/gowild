import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "../index.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import userImg from "../../../Images/userImg.png";
import {imageUrl, timeSince} from "../../../Helper/Helpers";
import moment from "moment/moment";

const Inbox = (props) => {
    // const { content } = props;
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        if (props){
            setCurrentItems(props.content.data)
        }
        // console.log(content)
    }, []);
    return (
        <>

            <div className={classes.messageListSidebar}>
                <form className={`${classes.searchform}`}>
                    <div className="form-group">
                        <input type="search" className="form-control" placeholder="Search Message" />
                    </div>
                </form>
                <ul>
                    {console.log(currentItems)}
                    {currentItems.map((data) => (
                        <li className="active">
                            <div className={classes.userImg}>
                                <img src={imageUrl(data.user?.picture,userImg)} alt="username"/>
                            </div>
                            <div className={classes.description}>
                                <h6>{`${data.user?.firstName} ${data.user?.lastName}`}</h6>
                                {data.message && <div className="text-muted">
                                    <time>{timeSince(Date.parse(data.message?.createdDate))}</time>
                                    <div className={classes.text}>
                                        {data.message?.message}
                                    </div>
                                </div>}

                                {data.unread_message_count>0 && <span className={classes.counter}>{data.unread_message_count}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default Inbox;