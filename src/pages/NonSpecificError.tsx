import question from '@/assets/images/question.png';
import Header from '@/components/common/navigation/Header';
import PagesContainer from '@/components/layout/PagesContainer';

function NonSpecificError() {
  return (
    <div>
      <Header />
      <PagesContainer>
        <div className='gap-4xl absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center'>
          <img src={question} alt='물음표 이미지' className='w-[9.75rem]' />
          <div className='gap-md flex flex-col text-center'>
            <p className='title-03 text-object-hero-dark'>
              현재 페이지를 불러오는 데 <br />
              문제가 생겼어요
            </p>
            <p className='label-lg text-object-neutral-dark'>
              관리자에게 자동으로 알림이 전송되었어요.
              <br />
              빠르게 해결할 수 있도록 노력 중이에요.
              <br />
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </PagesContainer>
    </div>
  );
}

export default NonSpecificError;
