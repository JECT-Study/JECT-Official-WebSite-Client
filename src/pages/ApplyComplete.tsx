import { Link } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

function ApplyComplete() {
  return (
    <div className='bg-surface-standard-dark flex h-dvh flex-col items-center justify-center'>
      <section className='gap-9xl flex w-[26.25rem] flex-col'>
        <div className='gap-4xl flex flex-col items-center'>
          <Title hierarchy='strong'>{APPLY_TITLE.complete}</Title>
          <p className='body-lg text-object-normal-dark text-center'>
            정성스레 작성해 주신 지원서는 성공적으로 제출되었어요. <br />
            함께 몰입할 날들을 기대하며, 꼼꼼히 확인해 볼게요!
            <br />
            지원해 주셔서 감사합니다!
          </p>
        </div>
        <Link to=''>
          <BlockButton size='lg' style='solid' hierarchy='accent' className='w-full'>
            메인 페이지로
          </BlockButton>
        </Link>
      </section>
    </div>
  );
}

export default ApplyComplete;
