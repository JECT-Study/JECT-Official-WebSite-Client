import { Fragment } from 'react/jsx-runtime';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import ProgressItem from '@/components/common/progress/ProgressItem';
import ProgressVerticalBridge from '@/components/common/progress/ProgressVerticalBridge';
import Title from '@/components/common/Title';
import { applyInfoList, applyProcedureList } from '@/constants/applyData';

function Apply() {
  // TODO: 개인정보 맟 이용 동의서, 회비 링크 걸기
  const now = new Date();

  return (
    <div className='bg-surface-standard-dark gap-12xl flex min-h-dvh flex-col items-center py-(--gap-12xl)'>
      <section className='gap-8xl flex w-[45rem] flex-col items-center justify-center'>
        <Title hierarchy='strong'>지원 과정</Title>
        <div className='bg-surface-tinted-dark radius-md border-border-trans-assistive-dark flex flex-col items-stretch border p-(--gap-2xl)'>
          {applyProcedureList.map((item, index) => (
            <Fragment key={index}>
              <ProgressItem
                index={index + 1}
                title={item.period}
                subTitle={item.subTitle}
                content={item.content}
                isActive={new Date(item.startDate) <= now}
              />
              {index + 1 < applyProcedureList.length && (
                <div className='self-center'>
                  <ProgressVerticalBridge isActive={new Date(item.startDate) <= now} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>
      <section className='gap-8xl flex w-[45rem] flex-col'>
        <Title hierarchy='strong'>지원 관련 안내</Title>
        <div className='gap-4xl flex flex-col'>
          {applyInfoList.map((item, index) => (
            <div key={index} className='gap-xs flex flex-col'>
              <Title hierarchy='normal'>{item.title}</Title>
              <p className='body-lg text-object-normal-dark'>
                {item.content}
                <br />
                {item.link ? item.link : null}
              </p>
            </div>
          ))}
        </div>
      </section>
      <BlockButton
        size='lg'
        style='solid'
        hierarchy='accent'
        rightIcon={
          <Icon name='forward' size='md' fillColor='fill-object-static-inverse-hero-dark' />
        }
        className='min-w-[26.25rem] cursor-pointer'
      >
        젝트 3기 지원하기
      </BlockButton>
    </div>
  );
}

export default Apply;
