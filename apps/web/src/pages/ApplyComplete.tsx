import { useNavigate } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE, applyComplete } from '@/constants/applyPageData';

function ApplyComplete() {
  const navigate = useNavigate();

  return (
    <div className='absolute top-1/2 left-1/2 flex -translate-1/2 flex-col'>
      <section className='gap-9xl flex w-[26.25rem] flex-col'>
        <div className='gap-4xl flex flex-col items-center'>
          <Title hierarchy='strong'>{APPLY_TITLE.complete}</Title>
          <p className='body-lg text-object-normal-dark text-center'>{applyComplete.content}</p>
        </div>
        <BlockButton size='lg' style='solid' hierarchy='accent' onClick={() => void navigate('/')}>
          {applyComplete.button}
        </BlockButton>
      </section>
    </div>
  );
}

export default ApplyComplete;
