import classes from "../index.module.scss";
import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';


const TermsAndConditions = () => {

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    const guidlinessTermsData = async () => {
        await AuthService.getMethod(ENDPOINT.admin_guidelines.terms_conditions)
            .then((res) => {
                setContent(res.data.data);
                setIsLoader(true);
                // console.log(res.data.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };

    const handleChange = event => {
        // 👇️ update textarea value
        setContent(event.target.value);
        console.log(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        return await AuthService.postMethod(ENDPOINT.admin_guidelines.terms_conditions)
            .then((res) => {
                setContent(res.data);
                //setIsLoader(true);
                console.log(event.current.value);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }




    useEffect(() => {
        guidlinessTermsData();
        setIsLoader(true);

    }, []);


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }


    return (
        <>
            <Row>
                {
                    content.filter(item => {
                        return item.type === "termsAndConditions" ? true : false;
                    }).map((content) => {
                        return (
                            <>
                                <Col md={8}>
                                    <div className={classes.editSection}>
                                        <Form >
                                            <Form.Group className={`${classes.formGroup} mb-3`}>
                                                <textarea name="content"
                                                    value={content.description}
                                                    onChange={handleChange}>
                                                    {/* {content.description} */}
                                                </textarea>

                                            </Form.Group>
                                            <Form.Group>
                                                <Button variant={"dark"} onClick={handleSubmit}> Save </Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={classes.logBox}>
                                        <h4> 
                                        April 23, 2022 
                                        </h4>
                                        
                                        <div className={"text-muted font-12"}>Update Logs</div>
                                        <ul className={classes.logList}>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className={"d-block"}>
                                                    {content.updatedDate}
                                                    {/* <span>{ (new Date(content.updatedDate)).toLocaleDateString() }</span> */}
                                                    </time>
                                                   
                                                    <div>Term &amp; Conditions - Updated!</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className="d-block">{content.createdDate}</time>
                                                    <div>FAQ</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default TermsAndConditions;