import {createContext, useReducer} from "react";
import {GithubReducer} from "./GithubReducer";

const GithubContext = createContext();

const github_url = process.env.REACT_APP_GITHUB_URL;
const github_token = process.env.REACT_APP_GITHUB_TOKEN;

const initial_state = {
    users: [],
    user: [],
    repos: [],
    loading: false
}

export const GithubProvider = (props) => {
    const [state, dispatch] = useReducer(GithubReducer, initial_state);

    const searchUser = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q:text
        });

        const response = await fetch(`${github_url}/search/users?${params}`, {
            headers: { Authorization: `${github_token}` }
        });

        const {items} = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: items
        });

        console.log(items);
    }

    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${github_url}/users/${login}`, {
            headers: { Authorization: `${github_token}` }
        });

        const data = await response.json();
        dispatch({
            type: 'GET_USER',
            payload: data
        });

        console.log(data);
    }

    const getUserAndRepos = async (login) => {
        setLoading();

        const response = await fetch(`${github_url}/users/${login}`, {
            headers: { Authorization: `${github_token}` }
        });

        const response2 = await fetch(`${github_url}/users/${login}/repos`, {
            headers: { Authorization: `${github_token}` }
        });

        const data = await response.json();
        const repos = await response2.json();

        dispatch({
            type: 'GET_USER_AND_REPOS',
            payload: {
                user: data,
                repos: repos
            }
        });

        console.log(data);
    }

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        });
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
            payload: []
        });
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser,
        getUserAndRepos
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubContext;