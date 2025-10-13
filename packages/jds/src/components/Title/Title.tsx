import { ReactNode } from 'react';
import { TitleDiv, TitleSize, TitleTextAlign } from './Title.style';

export interface TitleProps {
  size?: TitleSize;
  textAlign?: TitleTextAlign;
  color?: string;
  children: ReactNode;
}

export const Title = ({
  size = 'md',
  textAlign = 'left',
  color,
  children,
  ...props
}: TitleProps) => {
  return (
    <TitleDiv size={size} textAlign={textAlign} color={color} {...props}>
      {children}
    </TitleDiv>
  );
};

Title.displayName = 'Title';
