import { ReactNode } from 'react';
import { TitleDiv, TitleSize, TitleTextAlign } from './Title.style';
import { useTheme } from 'theme';

interface TitleProps {
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
  const theme = useTheme();
  const BaseColor = color || theme.color.object.bolder;

  return (
    <TitleDiv size={size} textAlign={textAlign} color={BaseColor} {...props}>
      {children}
    </TitleDiv>
  );
};

Title.displayName = 'Title';
