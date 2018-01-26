// @flow

import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/search';
import SearchBox from '../../components/organisms/Search/SearchBox';

import type { State } from '../../types/states';
import type { Params } from '../../types/apis/search';

type MapStateToProps = {
  searchHistory: {
    id: number;
    text: string;
    date: number;
  }[]; // TODO: fix
};

type MapDispatchToProps = {
  search: (Params) => {}; // fix
  showSearchHistory: () => {};
  insertSearchHistory: (string) => {};
};

export type Props = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: State): MapStateToProps => ({
  searchHistory: state.search.history.reverse()
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<*>): DispatchToProps => ({
  search             : (params) => dispatch(actions.search(params)),
  showSearchHistory  : () => dispatch(actions.showSearchHistory()),
  insertSearchHistory: (text) => dispatch(actions.insertSearchHistory(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
