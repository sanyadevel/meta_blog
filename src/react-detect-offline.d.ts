declare module 'react-detect-offline' {
  import * as React from 'react';

  export interface OnlineProps {
    children?: React.ReactNode;
    polling?: {
      url?: string;
      interval?: number;
      timeout?: number;
    };
  }

  export interface OfflineProps {
    children?: React.ReactNode;
    polling?: {
      url?: string;
      interval?: number;
      timeout?: number;
      activeColor?:string;
    };
  }

  export class Online extends React.Component<OnlineProps> {}
  export class Offline extends React.Component<OfflineProps> {}
}
