import React, {useEffect, useContext} from 'react';
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from '../../context/github/GithubContext';

const UserList = () => {
    const {users, loading} = useContext(GithubContext);

    let content = '';

    if(!loading){
        content = <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    }else{
        content = <Spinner />
    }

    return (
        <div>{content}</div>
    );
};

export default UserList;