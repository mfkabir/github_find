import React, {Fragment} from 'react';
import UserList from "../components/user/UserList";
import UserSearch from "../components/user/UserSearch";

const Home = () => {
    return (
        <Fragment>
            <UserSearch />
            <UserList />
        </Fragment>
    );
};

export default Home;