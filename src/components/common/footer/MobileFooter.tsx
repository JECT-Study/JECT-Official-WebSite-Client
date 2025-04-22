import Youtube from '@/assets/svg/footerYoutube.svg?react';
import Github from '@/assets/svg/github.svg?react';
import NewTabLink from '@/components/apply/NewTabLink';
import Logo from '@/components/common/logo/Logo';
import { JECT_EMAIL } from '@/constants/footer';

function MobileFooter() {
  return (
    <div className='bg-surface-standard-dark'>
      <footer className='bg-surface-tinted-dark text-object-alternative-dark gap-md flex min-h-[8.875rem] flex-col p-(--gap-md)'>
        <div>
          <Logo height={16} fillColor='fill-object-normal-dark' />
        </div>
        <p className='body-2xs'>
          젝트는 IT 사이드 프로젝트 동아리입니다.
          <br /> 몰입하며 진행하는 즐거운 프로젝트를 지향하고 있어요.
        </p>
        <div className='flex items-center'>
          <p className='body-2xs flex-1'>{JECT_EMAIL}</p>
          <div className='flex h-[1.5rem] gap-[1.25rem]'>
            <NewTabLink href='https://github.com/JECT-Study'>
              <Github width={24} />
            </NewTabLink>
            <NewTabLink href='https://www.youtube.com/@ject_it_club'>
              <Youtube height={24} />
            </NewTabLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MobileFooter;
