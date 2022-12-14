import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BsWhatsapp } from "react-icons/bs";
import { notLoggedIn, notFormCompleted } from "../../hooks/alert";
import find from "../../hooks/find";
import capitalizeFirst from "../../hooks/capitalizeFirst";
import SingleSlider from "../SingleSlider/SingleSlider";
import s from "./SinglePetCard.module.css";


const SinglePetCard = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { loggedUser, isAuthenticated } = useContext(AuthContext);

  const [pet, setPet] = useState({
    "_id": "",
    "animalname": "",
    "history": "",
    "image": [],
    "fundationId": "",
    "location": "",
    "size": "",
    "species": "",
    "sex": "",
    "personality": "",
    "age": "",
    "vaccines": ""
  });
  
  useEffect(() => {
    find(`/animal/${id}`)
      .then(petObj => setPet(petObj))
      .catch(error => console.log(error))
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (loggedUser.isFormComplete) {
        navigate("/form")
      } else {
        notFormCompleted();
        navigate(`/account/form/edit/${id}`)
      }
    } else {
        notLoggedIn();
        navigate("/login");
    }
  }


  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>{pet.animalname}</h1>
        <div className={s.content}>
          <SingleSlider images={pet.image}/>
          <div className={s.text}>
            <p >{`${pet.species && capitalizeFirst(pet.species)} • ${pet.sex && capitalizeFirst(pet.sex)}`}</p>
            <h4 className={s.subTitle}>Edad</h4>
            <p  className={s.info}>{pet.age && capitalizeFirst(pet.age)}</p>
            <h4 className={s.subTitle}>Tamaño </h4>
            <p  className={s.info}>{pet.size && capitalizeFirst(pet.size)}</p>
            <h4 className={s.subTitle}>Vacunas</h4>
            <p  className={s.info}>{pet.vaccines}</p>
            <h4 className={s.subTitle}>Carácter</h4>
            <p  className={s.info}>{pet.personality}</p>
            <h4 className={s.subTitle}>Historia</h4>
            <p  className={s.info}>{pet.history}</p>
            <h4 className={s.subTitle}>Ubicación</h4>
            <p  className={s.info}>{pet.location && capitalizeFirst(pet.location)}</p>
            <h4 className={s.subTitle}>{`Ayuda a ${pet.animalname && capitalizeFirst(pet.animalname)} a llegar a más personas`}</h4>
            <div className={s.columns}>
              <p  className={s.info}>Comparte su historia con tus amigos</p>
              <a className={s.waIcon} href={`https://api.whatsapp.com/send?text=Estoy buscando casa ¿Te animas a adoptarme?http://localhost:3000/animals/${id}`}><BsWhatsapp /></a>
            </div>
          </div>
          <button className={s.button} onClick={handleClick}>
            {`Adoptar a ${pet.animalname && capitalizeFirst(pet.animalname)}`}
          </button>

        </div>
      </div>

    </div>

  )
}

export default SinglePetCard;



