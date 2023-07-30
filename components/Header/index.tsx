import Image from "next/image";
import React from "react";
import classes from "./classnames";
import { useRouter } from "next/router";
import { Props } from "./type";

export default function Header({ title, onClick }: Props) {
  const router = useRouter();
  const isDetail = router.pathname === "/detail";
  return (
    <header className={classes.headerContainer}>
      {isDetail && (
        <p className={classes.backContainer} onClick={onClick}>
          <Image src="/back.png" alt="top image" width={20} height={20} />
        </p>
      )}
      <h1 className={classes.heading}>{title}</h1>
      {!isDetail && (
        <div className={classes.topImageContainer} onClick={onClick}>
          <Image
            src="/galleryIcon.png"
            alt="top image"
            width={20}
            height={20}
          />
        </div>
      )}
    </header>
  );
}
