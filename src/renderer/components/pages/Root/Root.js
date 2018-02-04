// @flow

import React from 'react';
import { ipcRenderer } from 'electron';

import type { Props } from '../../../containers/Root';

class Root extends React.PureComponent<Props, void> {
  componentWillMount() {
    this.props.routePage();

    // TODO: remove
    ipcRenderer.on('deleteDB', () => {
      this.props.deleteDB();
    });

    ipcRenderer.on('subWindow', (event, opened) => {
      this.props.updateSubWindowStatus(opened);
    });

    ipcRenderer.on('updateAudioStatus', () => {
      this.props.toggleStatus();
    });
  }

  render() {
    return (
      <div />
    );
  }
}

export default Root;
