// @flow

import React from 'react';
import styles from './style.css';

const MylistItem = (props) => (
  <div className={styles.container}>
    <p>{props.title}</p>
    <span>{props.num}</span>
  </div>
);

export default MylistItem;
