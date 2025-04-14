import { captureException } from '@sentry/react';
import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import questionImage from '@/assets/images/question.png';
import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import Header from '@/components/common/navigation/Header';
import PagesContainer from '@/components/layout/PagesContainer';

function RenderErrorFallback() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <div>
      <Header />
      <PagesContainer>
        <div className='gap-4xl absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center'>
          <img src={questionImage} alt='물음표 이미지' className='w-[9.75rem]' />
          <div className='gap-md flex flex-col text-center'>
            <p className='title-03 text-object-hero-dark'>
              웹페이지를 불러오는 도중 문제가 발생했어요.
            </p>
            <p className='label-lg text-object-neutral-dark'>
              서비스 이용에 불편을 드려 죄송합니다. 문제를 확인 중이에요.
            </p>
          </div>

          <BlockButton
            onClick={() => void navigate('/')}
            hierarchy='accent'
            size='md'
            style='solid'
            rightIcon={
              <Icon name='forward' size='sm' fillColor='fill-object-static-inverse-hero-dark' />
            }
          >
            메인 페이지로
          </BlockButton>
        </div>
      </PagesContainer>
    </div>
  );
}

export default RenderErrorFallback;
