import Youtube from '@/assets/svg/footerYoutube.svg?react';
import NewTabLink from '@/components/apply/NewTabLink';
import Icon from '@/components/common/icon/Icon';
import Logo from '@/components/common/logo/Logo';
import { JECT_EMAIL, JECT_FOOTER_INFO } from '@/constants/footer';

function Footer() {
  return (
    <div className='bg-surface-standard-dark'>
      <footer className='bg-surface-tinted-dark text-object-alternative-dark body-2xs gap-xl flex h-[4.875rem] items-center px-(--gap-5xl)'>
        <Logo height={20} fillColor='fill-object-normal-dark' />
        <div className='border-border-trans-alternative-dark h-[2rem] border-r'></div>
        <p className='grow'>{JECT_FOOTER_INFO}</p>
        <p>{JECT_EMAIL}</p>
        <div className='gap-xl flex'>
          <NewTabLink href='https://github.com/JECT-Study'>
            <Icon name='github' size='2xl' fillColor='fill-object-alternative-dark' />
          </NewTabLink>
          <NewTabLink href='https://www.youtube.com/@ject_it_club'>
            <Youtube />
          </NewTabLink>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
