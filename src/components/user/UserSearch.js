import React, {useState, useContext} from 'react';
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

const UserSearch = () => {
    const [text, setText] = useState('');
    const { users, searchUser, clearUsers } = useContext(GithubContext);
    const {setAlert} = useContext(AlertContext);
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text === undefined || text === ''){
            setAlert('Please fill the void', 'error');
        }else{
            searchUser(text);
            setText('');
        }
    }

    const handleClear = (e) => {
        clearUsers();
    }

    return (
        <div className='grid mb-8 gap-8 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder="Search"
                                onChange={handleChange}
                                value={text}
                            />
                            <button type='submit' className="btn btn-lg absolute top-0 right-0 rounded-l-none w-36">Go</button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button className="btn btn-ghost btn-lg" onClick={handleClear}>Clear</button>
                </div>
            )}
        </div>
    );
};

export default UserSearch;