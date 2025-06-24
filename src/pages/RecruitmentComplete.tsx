import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';

function RecruitmentComplete() {
  const GENERATION = 3;

  return (
    <div className='flex h-dvh translate-y-[-3.75rem] flex-col items-center justify-center'>
      <section className='gap-8xl flex flex-col'>
        <div className='gap-7xl flex flex-col text-center'>
          <Title hierarchy='strong' textColor='text-object-hero-dark'>
            {`${GENERATION}기 모집 완료`}
          </Title>
          <Label hierarchy='stronger' weight='bold' textColor='text-object-neutral-dark'>
            지금은 모집 기간이 아니에요.
            <br /> 다음 기수 모집 알림을 희망하시면, 버튼을 눌러 신청해주세요!
          </Label>
        </div>
        <BlockButton
          size='lg'
          style='solid'
          hierarchy='accent'
          rightIcon={
            <Icon name='northEast' size='md' fillColor='fill-object-static-inverse-hero-dark' />
          }
          className='min-w-[26.25rem] cursor-pointer'
          onClick={() =>
            window.open('https://forms.gle/NB3bBYYgBVN9cV4M7', '_blank', 'noopener,noreferrer')
          }
        >
          {`${GENERATION + 1}기 모집 알림 신청`}
        </BlockButton>
      </section>
    </div>
  );
}

export default RecruitmentComplete;
