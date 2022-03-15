/* Copyright (c) 2021-2022 SnailDOS */

export interface IOperation {
  scope: string;
}

export interface IFindOperation extends IOperation {
  query: any;
}

export interface IInsertOperation extends IOperation {
  item: any;
}

export interface IRemoveOperation extends IFindOperation {
  multi?: boolean;
}

export interface IUpdateOperation extends IFindOperation, IRemoveOperation {
  value: any;
}
