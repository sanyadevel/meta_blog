declare module 'react-heart' {
  import { Component } from 'react';

  export interface HeartProps {
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    animationScale: number;
  }

  export default class Heart extends Component<HeartProps, any> {}
}
