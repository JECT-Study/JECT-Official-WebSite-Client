import coneImage from '@/assets/images/cone.png';
import Youtube from '@/assets/svg/footerYoutube.svg?react';
import Github from '@/assets/svg/github.svg?react';
import NewTabLink from '@/components/apply/NewTabLink';
import Logo from '@/components/common/logo/Logo';
import { JECT_EMAIL } from '@/constants/footer';

function TempMobile() {
  return (
    <div className='relative'>
      <header className='bg-surface-standard-dark border-border-assistive-dark border-b px-(--gap-md) py-(--gap-xs)'>
        <Logo height={18} fillColor='fill-object-hero-dark' />
      </header>
      <div className='gap-2xl bg-surface-standard-dark flex min-h-dvh flex-col items-center justify-center'>
        <img src={coneImage} alt='물음표 이미지' className='w-[6rem]' />
        <div className='gap-3xs flex flex-col text-center'>
          <p className='title-02 text-object-hero-dark'>
            젝트 웹사이트는 <br /> PC로 이용해주세요
          </p>
          <p className='label-sm text-object-neutral-dark'>
            현재 모바일에서는 접근할 수 없어요. <br /> 불편함을 드려 죄송합니다.
          </p>
        </div>
      </div>
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
    </div>
  );
}

export default TempMobile;
