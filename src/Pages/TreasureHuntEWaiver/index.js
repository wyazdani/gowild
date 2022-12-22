import PageTitle from "../../Components/Pagetitle";
import classes from "./index.module.scss";
import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';


const TreasureHuntEWaiver = (props) => {

    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(false);


    const guidlinessTreasureHuntData = async () => {
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
        guidlinessTreasureHuntData();
        setIsLoader(true);

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

    return (
        <>
            <PageTitle title={"Treasure Hunt - E Waiver"} />
            <section className={"section"}>
                <Row>
                    {
                        content.filter(item => {
                            return item.type === "huntEWaiver" ? true : false;
                        }).map((content) => {
                            return (
                                <>
                                    <Col md={8}>
                                        <div className={"d-flex justify-content-between align-items-center pb-3"}>
                                            <h5>E - Waiver</h5>
                                            <Form.Select className={"form-select"} aria-label="Default select example" style={{ maxWidth: "150px" }}>
                                                <option>Select Events</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className={classes.editSection}>
                                            <Form>
                                                <Form.Group className={`${classes.formGroup} mb-3`}>

                                                    <textarea>
                                                        {content.description}
                                                    </textarea>

                                                </Form.Group>
                                                <Form.Group>
                                                    <Button variant={"dark"}>Save</Button>
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
            </section>
        </>
    )
}

export default TreasureHuntEWaiver;