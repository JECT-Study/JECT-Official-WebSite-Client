import LogoIcon from '@/assets/svg/logo.svg?react';

interface LogoProps {
  height: number;
  fillColor: string;
}

function Logo({ height, fillColor }: LogoProps) {
  return <LogoIcon className={fillColor} height={height} />;
}

export default Logo;
