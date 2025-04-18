import { isMobile } from 'react-device-detect';

import coneImage from '@/assets/images/cone.png';
import Youtube from '@/assets/svg/footerYoutube.svg?react';
import Github from '@/assets/svg/github.svg?react';
import NewTabLink from '@/components/apply/NewTabLink';
import Footer from '@/components/common/footer/Footer';
import Logo from '@/components/common/logo/Logo';
import PagesContainer from '@/components/layout/PagesContainer';
import { JECT_EMAIL } from '@/constants/footer';

function Maintenance() {
  return (
    <div>
      <PagesContainer>
        <div className='gap-4xl absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center'>
          <img src={coneImage} alt='물음표 이미지' className='w-[9.75rem]' />
          <div className='gap-md flex flex-col text-center'>
            <p className='title-03 text-object-hero-dark'>현재 서비스 점검중이에요</p>
            <p className='label-lg text-object-neutral-dark'>예상 점검 시간 : 05:00 ~ 07:00</p>
          </div>
        </div>
      </PagesContainer>
      {isMobile ? (
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
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default Maintenance;
