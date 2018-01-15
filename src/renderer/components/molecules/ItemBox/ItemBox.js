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
  <section className={styles.container}>
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
    <div className={styles.info}>
      <p
        title={props.title}
        className={styles.title}
      >
        {props.title}
      </p>
      <div className={styles.infoDetail}>
        {
          props.viewCount ? (
            <span>視聴回数 {(~~props.viewCount).toLocaleString()}</span>
          ) : null
        }
        {
          props.commentCount ? (
            <span>コメント数 {(~~props.commentCount).toLocaleString()}</span>
          ) : null
        }
      </div>
    </div>
  </section>
);

export default ItemBox;
