import { useNavigate } from 'react-router-dom';

import questionImage from '@/assets/images/question.png';
import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import Header from '@/components/common/navigation/Header';
import PagesContainer from '@/components/layout/PagesContainer';

function NotFoundError() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <PagesContainer>
        <div className='gap-4xl absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center'>
          <img src={questionImage} alt='물음표 이미지' className='w-[9.75rem]' />
          <div className='gap-md flex flex-col text-center'>
            <p className='title-03 text-object-hero-dark'>페이지를 찾을 수 없어요</p>
            <p className='label-lg text-object-neutral-dark'>
              잘못된 주소를 입력했거나, 삭제된 페이지예요.
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

export default NotFoundError;
