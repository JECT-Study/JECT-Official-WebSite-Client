import Check from '@/assets/svg/check.svg?react';
import Clear from '@/assets/svg/clear.svg?react';
import DropDown from '@/assets/svg/dropDown.svg?react';
import Error from '@/assets/svg/error.svg?react';
import Expand from '@/assets/svg/expand.svg?react';
import File from '@/assets/svg/file.svg?react';
import Forward from '@/assets/svg/forward.svg?react';
import Github from '@/assets/svg/github.svg?react';
import Less from '@/assets/svg/less.svg?react';
import NorthEast from '@/assets/svg/northEast.svg?react';
import Question from '@/assets/svg/question.svg?react';
import Upload from '@/assets/svg/upload.svg?react';
import Youtube from '@/assets/svg/youtube.svg?react';
import { iconStyle } from '@/styles/iconStyle';
import { IconNames, IconSize } from '@/types/icon';

interface IconProps {
  name: IconNames;
  size: IconSize;
  fillColor: string;
}

function Icon({ name, size, fillColor }: IconProps) {
  const iconSize = iconStyle.size[size];

  switch (name) {
    case 'check':
      return <Check className={fillColor} width={iconSize} height={iconSize} />;
    case 'clear':
      return <Clear className={fillColor} width={iconSize} height={iconSize} />;
    case 'dropDown':
      return <DropDown className={fillColor} width={iconSize} height={iconSize} />;
    case 'error':
      return <Error className={fillColor} width={iconSize} height={iconSize} />;
    case 'expand':
      return <Expand className={fillColor} width={iconSize} height={iconSize} />;
    case 'file':
      return <File className={fillColor} width={iconSize} height={iconSize} />;
    case 'forward':
      return <Forward className={fillColor} width={iconSize} height={iconSize} />;
    case 'github':
      return <Github className={fillColor} width={iconSize} height={iconSize} />;
    case 'less':
      return <Less className={fillColor} width={iconSize} height={iconSize} />;
    case 'northEast':
      return <NorthEast className={fillColor} width={iconSize} height={iconSize} />;
    case 'question':
      return <Question className={fillColor} width={iconSize} height={iconSize} />;
    case 'upload':
      return <Upload className={fillColor} width={iconSize} height={iconSize} />;
    case 'youtube':
      return <Youtube className={fillColor} width={iconSize} height={iconSize} />;
    default:
      return null;
  }
}

export default Icon;
