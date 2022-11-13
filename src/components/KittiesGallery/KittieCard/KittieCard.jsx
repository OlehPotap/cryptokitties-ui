import s from "./kittieCard.module.scss";
import { forwardRef } from "react";
import onErrorImg from "../../../assets/images/error-img.jpg";

const KittieCard = forwardRef(
  ({ img, isAvailable, category, name, price }, ref) => {
    return (
      <li
        ref={ref}
        className={
          isAvailable ? s.ImageGalleryItem : s.ImageGalleryItemAnavailable
        }
      >
        <img
          onError={(e) => {
            e.target.src = onErrorImg;
          }}
          className={s.ImageGalleryItemImage}
          src={img}
          alt="kittie"
          onClick={() => {}}
        />
        <div className={s.ImageGalleryInfo}>
          <p className={s.KittieCategory}>category: {category}</p>
          <p className={s.KittieName}>{name}</p>
          <p className={s.KittiePrice}>price: {price}</p>
        </div>
      </li>
    );
  }
);

export default KittieCard;
