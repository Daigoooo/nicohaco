// @flow

import type {
  Mylistitem,
  Mylistgroup
} from '../apis/mylist';

export type Setup = {
  type: 'SETUP_MYLIST';
};

export type ShowMylist = {
  type: 'SHOW_MYLIST';
  id: string;
};

export type InsertMylist = {
  type: 'INSERT_MYLIST';
  id: number;
  mylist: Array<Mylistitem>;
};

export type FetchMylistgroup = {
  type: 'FETCH_MYLISTGROUP';
};

export type ShowMylistgroup = {
  type: 'SHOW_MYLISTGROUP';
};

export type CreateMylist = {
  type: 'CREATE_MYLIST';
  name: string;
};

export type AddVideo = {
  type: 'ADD_VIDEO';
  videoId: string;
  groupId: string;
};

export type RemoveVideo = {
  type: 'REMOVE_VIDEO';
  itemId: string;
  groupId: string;
};

export type LoadMylist = {
  type: 'LOAD_MYLIST';
  id: string;
};

export type FetchMylist = {
  type: 'FETCH_MYLIST';
  id: number;
};

export type UpdateMylistgroup = {
  type: 'UPDATE_MYLISTGROUP';
  groupId: string;
  items: Array<Mylistgroup>;
};

/**
 * from saga
 */

export type FetchMylistgroupSuccess = {
  type: 'FETCH_MYLISTGROUP_SUCCESS';
  payload: {
    mylistgroup: Array<Mylistgroup>;
  };
};

export type ShowMylistgroupSuccess = {
  type: 'SHOW_MYLISTGROUP_SUCCESS';
  payload: {
    mylistgroup: Array<Mylistgroup>;
  };
};

export type FetchMylistSuccess = {
  type: 'FETCH_MYLIST_SUCCESS';
  payload: {
    groupId: number;
    totalTime: string;
    totalVideo: number;
    mylistitem: Array<Mylistitem>;
  };
};

export type ShowMylistSuccess = {
  type: 'SHOW_MYLIST_SUCCESS';
  payload: {
    groupId: number;
    totalTime: string;
    mylistitem: Array<Mylistitem>;
    totalVideos: number;
  };
};

export type InsertMylistgroup = {
  type: 'INSERT_MYLISTGROUP';
  payload: {
    mylistgroup: Array<Mylistgroup>;
  };
};

export type Mylist =
  Setup |
  AddVideo |
  ShowMylist |
  LoadMylist |
  RemoveVideo |
  FetchMylist |
  CreateMylist |
  InsertMylist |
  ShowMylistgroup |
  FetchMylistgroup |
  InsertMylistgroup |
  UpdateMylistgroup |
  ShowMylistSuccess |
  FetchMylistSuccess |
  ShowMylistgroupSuccess |
  FetchMylistgroupSuccess;
