import React, {Fragment} from 'react';
import UserProfile from "../components/user/UserProfile";
import {useParams} from "react-router-dom";

const User = () => {
    const params = useParams();
    return (
        <Fragment>
            <UserProfile user={params.login} />
        </Fragment>
    );
};

export default User;