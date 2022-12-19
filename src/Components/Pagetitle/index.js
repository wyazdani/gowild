import React from "react";
import classes from "./index.module.scss";

const PageTitle = (prorps) => {
    return (
        <div className={`${classes.pageTitle}`}>
            <h1>{prorps.title}</h1>
        </div>
    )
}

export default PageTitle;