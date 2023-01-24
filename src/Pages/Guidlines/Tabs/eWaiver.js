import classes from "../index.module.scss";
import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';

const EWavier = () => {


    const [content, setContent] = useState("");
    const [isLoader, setIsLoader] = useState(false);



    // const handleChange = (event) => {
    //     let name = event.target.name;
    //     const value = event.target.value;
    //     // const value = event.target.value.replace(/\D/g, "");
    //     // const value = event.target.value.replace(/(0|)\D/g, "");
    //     setContent((prevalue) => {
    //         return {
    //             ...prevalue,   // Spread Operator               
    //             [name]: value
    //         }
    //     })
    // }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setContent({ ...content, [name]: value });
    }

    const guidlinessWaiverData = async () => {
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

    useEffect(() => {
        guidlinessWaiverData();

    }, []);

    // convert date format to month / day / year
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }


    if (!isLoader) {
        return (
            <div className='loader'>
                <h3>Loading...</h3>
            </div>
        );
    }

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };


    const submitEventForm = async (event) => {
        // console.log("1233"+id);
        // console.log("historicalData" , historicalData);
        event.preventDefault();
        const dataObj = {
            "type": "eWaiver",
            "description": content.description,
        }

        return AuthService.postMethod(ENDPOINT.admin_guidelines.terms_conditions, true, dataObj)
            .then((res) => {
                // if (res.status === 200) {
                //     toast.success('Historical Event Routes submitted Successfully!', {
                //         position: "bottom-right",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: "dark",
                //     });
                // }
                console.log(res);
                // navigate('/route-list');
                // setFormData("");
                // event.target.reset();
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };

    const filteredContent = content.filter(item => {
        return item.type === "eWaiver" ? true : false;
    });

    return (
        <>
            <Row>
                {
                    filteredContent.map((content, index) => {
                        return (
                            <>
                                <Col md={8} key={index}>
                                    <div className={classes.editSection}>
                                        <Form >
                                            <Form.Group className={`${classes.formGroup} mb-3`}>
                                                {/* <textarea>
                                                    {content.description}
                                                </textarea> */}
                                                <textarea
                                                    name="description"
                                                    value={content.description}
                                                    onChange={handleChange}
                                                >
                                                </textarea>
                                            </Form.Group>
                                            <Form.Group>
                                                <Button variant={"dark"} onClick={submitEventForm}> Save </Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={classes.logBox}>
                                        <h4>  {(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)} </h4>
                                        <div className={"text-muted font-12"}>Update Logs</div>
                                        <ul className={classes.logList}>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className={"d-block"}>
                                                        {(formatDate(content.updatedDate))}
                                                    </time>
                                                    <div>Term &amp; Conditions - Updated!</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={classes.box}>
                                                    <time className="d-block">
                                                        {(formatDate(content.createdDate))}
                                                    </time>
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

export default EWavier;