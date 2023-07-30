/* eslint-disable @next/next/no-img-element */
import classes from "./classnames";
import { Props } from "./types";

export default function Product({
  coverImage,
  discountRate,
  title,
  price,
  onClick,
}: Props) {
  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.imageConatiner}>
        <img
          src={coverImage}
          className={classes.image}
          alt={"image for " + title}
        />
      </div>
      <div className={classes.descriptiotnContainer}>
        <div className={classes.titleContainer}>{title}</div>
        <div className={classes.priceContainer}>
          <p className={classes.discount}>{discountRate + "%"}</p>{" "}
          <p>{"$" + price}</p>
        </div>
      </div>
    </div>
  );
}
