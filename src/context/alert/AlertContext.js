import {createContext, useReducer} from "react";
import {AlertReducer} from "./AlertReducer";

const AlertContext = createContext();

const initial_state = null;
export const AlertProvider = (props) => {
    const [state, dispatch] = useReducer(AlertReducer, initial_state);

    const setAlert = (msg, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {msg, type}
        });

        setTimeout(() => { dispatch({type: 'REMOVE_ALERT'}) }, 3000);
    }

    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContext;