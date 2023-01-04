import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from '../../contexts/StoreContext';

const UserThumb = () => {
    const { token, setToken } = useContext(StoreContext);
    const { userLogged, setUserLogged } = useContext(StoreContext);

    return (

        <div className="rf-user__thumb">
            <div className="rf-icon-user"></div>
            <div className="--frow-center --fgap-10">
                <strong>{userLogged.pessoaNome}</strong>
            </div>
        </div>
    )
}

export default UserThumb;