// @flow

/* eslint-disable no-console */
/* eslint-disable flowtype/space-after-type-colon */

import { takeEvery, effects } from 'redux-saga';
import db from '../db';

import type { Effect } from 'redux-saga';
import type { InsertUserData } from '../types/actions/auth';
import type {
  ShowMylist,
  InsertMylist,
  UpdateMylistgroup,
  InsertMylistgroup
} from '../types/actions/mylist';
import type { InsertSearchHistory } from '../types/actions/search';

const { put } = effects;

// Open the database
db.open();

/**
 * insert user data to indexedDB
 * @param {UserData} action
 */
function *insertUserData(action: InsertUserData): Generator<Effect, void, *> {
  try {
    yield db.userData.add(action.payload.userData);
  } catch (e) {
    console.error(e);
  }
}

/**
 * show user data from indexedDB
 */
function *showUserData(): Generator<Effect, void, *> {
  try {
    const userData = yield db.userData.toArray();

    yield put({
      type   : 'SHOW_USER_DATA_SUCCESS',
      payload: {
        userData
      }
    });
  } catch (e) {
    console.error(e);
  }
}

// [TODO] TYPE
/**
 * delete user data from indexedDB
 * @param {DeleteUserData} action
 */
function *deleteUserData(): Generator<Effect, void, *> {
  try {
    yield db.userData.clear();
  } catch (e) {
    console.error(e);
  }
}

/**
 * insert mylistgroup to indexedDB
 * @param {InsertMylistgroup} action
 */
function *insertMylistgroup(action: InsertMylistgroup):
  Generator<Effect, void, *>
{
  try {
    yield db.mylistgroup.clear();
    yield db.mylistgroup.bulkAdd(action.payload.mylistgroup);
  } catch (e) {
    console.error(e);
  }
}

/**
 * show mylistgroup from indexedDB
 */
function *showMylistgroup(): Generator<Effect, void, *> {
  try {
    const mylistgroup = yield db.mylistgroup.toArray();

    yield put({
      type   : 'SHOW_MYLISTGROUP_SUCCESS',
      payload: {
        mylistgroup
      }
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * update mylistgroup in indexedDB
 * @param {UpdateMylistgroup} action
 */
function *updateMylistgroup(action: UpdateMylistgroup):
  Generator<Effect, void, *>
{
  try {
    yield db.mylistgroup.update(action.groupId, action.items);
  } catch (e) {
    console.error(e);
  }
}

/**
 * insert mylist to indexedDB
 * @param {InsertMylist} action
 */
function *insertMylist(action: InsertMylist): Generator<Effect, void, *> {
  try {
    const img = action.mylist.map((item) => item.thumbnailUrl).slice(0, 4);

    yield db.mylistgroup.update(action.id, {
      img,
      mylist: JSON.stringify(action.mylist) // [TODO] fix later
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * show mylist from indexedDB
 * @param {ShowMylist} action
 */
function *showMylist(action: ShowMylist): Generator<Effect, void, *> {
  try {
    let mylistitem;

    yield db.mylistgroup.get(action.id, (item) => {
      mylistitem = JSON.parse(item.mylist || '[]');
    });

    yield put({
      type   : 'SHOW_MYLIST_SUCCESS',
      payload: {
        mylistitem
      }
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * insert search history to indexedDB
 * @param {InsertSearchHistory} action
 */
function *insertSearchHistory(action: InsertSearchHistory):
  Generator<Effect, void, *>
{
  try {
    const payload = {
      text: action.text,
      date: (new Date()).getTime()
    };

    yield db.history.add({
      text: payload.text,
      date: payload.date
    });

    yield put({
      type: 'INSERT_SEARCH_HISTORY_SUCCESS',
      payload
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * show search history from indexedDB
 */
function *showSearchHistory(): Generator<Effect, void, *> {
  try {
    const history = yield db.history.toArray();

    yield put({
      type   : 'SHOW_SEARCH_HISTORY_SUCCESS',
      payload: history
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * delete search history from indexedDB
 */
function *deleteSearchHistory() {
  try {
    yield db.history.clear();
  } catch (e) {
    console.error(e);
  }
}

/**
 * delete(truncate) db
 */
function *deleteDB() {
  try {
    yield db.delete();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Root for db
 */
export default function *mylistProcess(): Generator<Effect, void, *> {
  yield takeEvery('SHOW_USER_DATA', showUserData);
  yield takeEvery('INSERT_USER_DATA', insertUserData);
  yield takeEvery('DELETE_USER_DATA', deleteUserData);

  yield takeEvery('SHOW_MYLISTGROUP', showMylistgroup);
  yield takeEvery('INSERT_MYLISTGROUP', insertMylistgroup);
  yield takeEvery('UPDATE_MYLISTGROUP', updateMylistgroup);

  yield takeEvery('SHOW_MYLIST', showMylist);
  yield takeEvery('INSERT_MYLIST', insertMylist);

  yield takeEvery('SHOW_SEARCH_HISTORY', showSearchHistory);
  yield takeEvery('INSERT_SEARCH_HISTORY', insertSearchHistory);
  yield takeEvery('DELETE_SEARCH_HISTORY', deleteSearchHistory);

  yield takeEvery('DELETE_DB', deleteDB);
}
