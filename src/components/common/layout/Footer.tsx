import Icon from '../icon/Icon';
import Logo from '../logo/Logo';

import Youtube from '@/assets/svg/footerYoutube.svg?react';
import NewTabLink from '@/components/apply/NewTabLink';

function Footer() {
  return (
    <footer className='bg-surface-standard-dark text-object-alternative-dark body-2xs gap-xl flex h-[4.875rem] items-center px-(--gap-5xl)'>
      <Logo height={20} fillColor='fill-object-normal-dark' />
      <div className='border-border-trans-alternative-dark h-[2rem] border-r'></div>
      <p className='grow'>
        젝트는 IT 사이드 프로젝트 동아리입니다. 몰입하며 진행하는 즐거운 프로젝트를 지향하고 있어요.
      </p>
      <p>jectofficial@gmail.com</p>
      <div className='gap-xl flex'>
        <NewTabLink href='https://github.com/JECT-Study'>
          <Icon name='github' size='2xl' fillColor='fill-object-alternative-dark' />
        </NewTabLink>
        <NewTabLink href='https://www.youtube.com/@ject_it_club'>
          <Youtube />
        </NewTabLink>
      </div>
    </footer>
  );
}

export default Footer;
