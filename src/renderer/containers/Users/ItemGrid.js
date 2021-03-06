// @flow

import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/users';
import * as commonActions from '../../actions/common';
import * as playerActions from '../../actions/player';
import ItemGrid from '../../components/organisms/Users/ItemGrid';
import WrapperComponent from '../../components/WrapperComponent';

import type { State } from '../../types/states';

type MapStateToProps = {
  id: string;
  videos: Object[]; // TODO: fix
};

type MapDispatchToProps = {
  play: ('video' | 'audio', number, Object[]) => void; // TODO: fix
  fetchUserVideos: (string) => {};
};

export type Props = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: State): MapStateToProps => ({
  id    : state.router.location.pathname.split('/').slice(-1)[0],
  videos: state.users.user.videos
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<*>): MapDispatchToProps => ({
  play: (type, index, list) => {
    dispatch(playerActions.insertToPlaylist(list));
    dispatch(playerActions.play(type, index));
  },
  setup       : (id) => dispatch(actions.fetchUserVideos(id)),
  actionMylist: (item) => dispatch(commonActions.openModal(item)) // add
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperComponent(ItemGrid));
