import React from "react";
import { Link } from "react-router-dom";
import s from "./OrgCard.module.css";
import capitalizeFirst from "../../hooks/capitalizeFirst";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const OrgCard = ({ org }) => {
  let isFav = false;

  const addToFav = (e) => {
    e.preventDefault();
    isFav ? (isFav = false) : (isFav = true);

    console.log(isFav);
  };

  return (
    <div className={s.orgCard}>
      <Link className={s.link} to={`/association/${org._id}`}>
        <img
          className={s.orgImage}
          src={require(`../../assets/img/foundations${org.image}`)}
          alt={org.foundationName}
        ></img>
        <div className={s.orgInfo}>
          <span className={s.orgName}>{capitalizeFirst(org.foundationName)}</span>
          <br />
          <span>{capitalizeFirst(org.location)}</span>
          {/* <br />
          <span>{org.description}</span> */}
        </div>
      </Link>
      <button className={s.favButton} type="submit" onClick={addToFav}>
        {" "}
        {isFav ? null : <FaRegHeart />}
      </button>
    </div>
  );
};

export default OrgCard;
