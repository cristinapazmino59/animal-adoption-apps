import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import find from "../../hooks/find";
import capitalizeFirst from "../../hooks/capitalizeFirst";
import s from "./Account.module.css";
import axios from 'axios';

const Account = () => {
    const navigate = useNavigate();
    let id = useParams().id;
    const [user, setUser] = useState({})

    useEffect(() => {
        // find(`/orgs/account/${id}`)
        axios.get(`http://localhost:3030/orgs/account/${id}`)
        .then(userObj => setUser(userObj))
        .catch(error => console.log(error))
    }, [id])

    console.log("datos de fundacion: ", user);
    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/account/edit/${id}`)
    }

  return (
    <div className={s.container}>
            <div className={s.card}>
                <h1 className={s.title}>Mi cuenta</h1>
                <div className={s.data}>
                    <div className={s.imgContainer}>
                    <img className={s.userImage} 
                        src={user.image 
                            ? user.image === "no_user" ? require(`../../assets/img/accounts/no_user.jpg`) : require(`../../assets/img/users${user.image}.jpg`)
                            : require(`../../assets/img/accounts/no_user.jpg`)
                        }
                        alt="Foto de perfil">
                    </img>
                    </div>
                    <h4 className={s.subTitle}>Usuario</h4>
                    <p  className={s.info}>{user.data ? user.data.foundationName : null}</p>
                    <h4 className={s.subTitle}>E-mail</h4>
                    <p  className={s.info}>{user.data ? user.data.email : null}</p>
                    <h4 className={s.subTitle}>Contraseña</h4>
                    <p  className={s.info}>***********</p>
                </div>
            <button className={s.button} onClick={handleClick}>Editar info</button>
            </div>
        </div>
  )
}

export default Account