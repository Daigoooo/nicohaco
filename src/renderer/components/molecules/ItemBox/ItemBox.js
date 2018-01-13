// @flow

import React from 'react';
import Overlay from '../ItemBoxOverlay';
import Image from '../../atoms/Image';
import styles from './style.css';

type Props = {
  img: string;
  title: string;
  actions: {
    icon: string;
    onClick: () => {};
  }[];
  watchId: string;
  onClick: () => {};
  totalTime: string;
};

const ItemBox = (props: Props) => (
  <section
    data-watchId={props.watchId}
    className={styles.container}
  >
    <div className={styles.img}>
      <Image src={props.img} />
      <span className={styles.totalTime}>{props.totalTime}</span>
      <Overlay
        onClick={props.onClick}
        watchId={props.watchId}
        actions={props.actions}
        className={styles.overlay}
        totalTime={props.totalTime}
      />
    </div>
    <p
      title={props.title}
      className={styles.title}
    >
      {props.title}
    </p>
  </section>
);

export default ItemBox;
