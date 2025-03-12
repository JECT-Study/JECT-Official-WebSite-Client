import { FunctionComponent, SVGProps } from 'react';

import Check from '@/assets/svg/check.svg?react';
import Clear from '@/assets/svg/clear.svg?react';
import Download from '@/assets/svg/download.svg?react';
import DropDown from '@/assets/svg/dropDown.svg?react';
import Edit from '@/assets/svg/edit.svg?react';
import Error from '@/assets/svg/error.svg?react';
import Expand from '@/assets/svg/expand.svg?react';
import File from '@/assets/svg/file.svg?react';
import Forward from '@/assets/svg/forward.svg?react';
import Github from '@/assets/svg/github.svg?react';
import Invisible from '@/assets/svg/invisible.svg?react';
import Less from '@/assets/svg/less.svg?react';
import Minus from '@/assets/svg/minus.svg?react';
import NorthEast from '@/assets/svg/northEast.svg?react';
import Question from '@/assets/svg/question.svg?react';
import RightChevron from '@/assets/svg/rightChevron.svg?react';
import Upload from '@/assets/svg/upload.svg?react';
import Visible from '@/assets/svg/visible.svg?react';
import Youtube from '@/assets/svg/youtube.svg?react';
import { iconStyle } from '@/styles/iconStyle';
import { IconNames, IconSize } from '@/types/ui/icon';

interface IconProps {
  name: IconNames;
  size: IconSize;
  fillColor: string;
}

function Icon({ name, size, fillColor }: IconProps) {
  const iconSize = iconStyle.size[size];

  const icons: Record<IconNames, FunctionComponent<SVGProps<SVGSVGElement>>> = {
    check: Check,
    clear: Clear,
    dropDown: DropDown,
    error: Error,
    expand: Expand,
    file: File,
    forward: Forward,
    github: Github,
    less: Less,
    northEast: NorthEast,
    question: Question,
    upload: Upload,
    youtube: Youtube,
    download: Download,
    edit: Edit,
    invisible: Invisible,
    minus: Minus,
    rightChevron: RightChevron,
    visible: Visible,
  };

  const IconComponent = icons[name];

  return <IconComponent className={fillColor} width={iconSize} height={iconSize} />;
}

export default Icon;
