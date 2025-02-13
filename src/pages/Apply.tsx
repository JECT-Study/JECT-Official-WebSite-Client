import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import ProgressItem from '@/components/common/progress/ProgressItem';
import ProgressVerticalBridge from '@/components/common/progress/ProgressVerticalBridge';
import Title from '@/components/common/Title';

function Apply() {
  // TODO: 날짜 배열에 맞게 isActive-> true로 바꾸기
  // TODO: 개인정보 맟 이용 동의서, 회비 링크 걸기
  // TODO: 지원하기 버튼 구현
  // TODO: 지원하기는 어떤 링크인지? 색상 확인, 막대기 색상 확인. => 페이지 하단으로 이동하는 버튼

  const moveToApplyButton = () => {
    window.scrollTo({ 
      top: document.body.scrollHeight, // <- 페이지 총 Height
      behavior: "smooth" 
    });
  }

  return (
    <div className='bg-surface-standard-dark gap-12xl flex min-h-dvh flex-col items-center py-(--gap-12xl)'>
      <section className='gap-8xl flex w-[45rem] flex-col items-center justify-center'>
        <Title hierarchy='strong'>지원 과정</Title>
        <div className='bg-surface-tinted-dark radius-md border-border-trans-assistive-dark flex flex-col items-stretch border p-(--gap-2xl)'>
          <ProgressItem
            index={1}
            title='3월 12일(수) ~ 3월 19일(수)'
            subTitle='지원 접수 기간'
            content={
              <p>
                젝트 웹사이트의&nbsp;
                <button onClick={moveToApplyButton} className='cursor-pointer text-feedback-information-dark decoration-feedback-information-dark underline'>
                  지원하기
                </button>
                를 통해 접수를 받고 있어요.
              </p>
            }
            isActive={true}
          />
          <div className='self-center'>
            <ProgressVerticalBridge isActive={false} />
          </div>

          <ProgressItem
            index={2}
            title='3월 23일(일)'
            subTitle='서류 합격 발표'
            content='지원자분들의 서류를 검토한 뒤, 1차 합격을 발표드려요.'
            isActive={false}
          />
          <div className='self-center'>
            <ProgressVerticalBridge isActive={false} />
          </div>
          <ProgressItem
            index={3}
            title='3월 26일(수) ~ 3월 29일(토)'
            subTitle='커피챗 진행'
            content='더 많은 이야기를 나눠 보고 싶은 1차 합격자분들과 커피챗을 진행해요.'
            isActive={false}
          />
          <div className='self-center'>
            <ProgressVerticalBridge isActive={false} />
          </div>
          <ProgressItem
            index={4}
            title='3월 31일(월)'
            subTitle='최종 합격 발표'
            content='젝트와 함께 몰입해 프로젝트를 진행할 분들을 최종적으로 발표드려요.'
            isActive={false}
          />
        </div>
      </section>
      <section className='gap-8xl flex w-[45rem] flex-col'>
        <Title hierarchy='strong'>지원 관련 안내</Title>
        <div className='gap-4xl flex flex-col'>
          <div className='gap-xs flex flex-col'>
            <Title hierarchy='normal'>젝트는 지속 가능한 동아리를 목표로 하고 있어요</Title>
            <p className='body-lg text-object-normal-dark'>
              젝트는 각 기수별로 프로젝트를 진행한 이후에도, 소속된 동아리 멤버들과 자체적인
              프로젝트를 추진해요. 미니스터디와 젝커톤, 네트워킹 등의 여러 활동을 함께합니다. 일회성
              프로젝트에 그치지 않고 함께 유익한 정보를 공유하며 좋은 인연을 지속해요.
            </p>
          </div>
          <div className='border-border-trans-alternative-dark border'></div>
          <div className='gap-xs flex flex-col'>
            <Title hierarchy='normal'>진중하게 참여하는 태도를 보여주세요!</Title>
            <p className='body-lg text-object-normal-dark'>
              젝트는 몰입형 IT 사이드 프로젝트 동아리에요. 프로젝트를 진행하는 약 3달의 기간을
              소화할 수 있는 여유와, 그에 상응하는 열정이 동반되어야 해요. 지원자분께서는 현재
              개인의 상황을 심도 있게 고려하신 뒤, 책임감을 가지고 지원해 주세요.
            </p>
          </div>
          <div className='border-border-trans-alternative-dark border'></div>
          <div className='gap-xs flex flex-col'>
            <Title hierarchy='normal'>개인정보 수집 및 이용 관련</Title>
            <p className='body-lg text-object-normal-dark'>
              지원자분의 편의를 위해 지원하실 때 작성하시는 내용들은 모두 수집돼요. 젝트 지원부터
              지원 기간 종료까지 지원자분의 소중한 정보를 안전하게 보관할 것을 약속드립니다.
              <br />
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='text-feedback-information-dark decoration-feedback-information-dark underline'
              >
                개인정보 수집 및 이용 동의서
              </a>
            </p>
          </div>
          <div className='border-border-trans-alternative-dark border'></div>
          <div className='gap-xs flex flex-col'>
            <Title hierarchy='normal'>회비가 있어요</Title>
            <p className='body-lg text-object-normal-dark'>
              서로 다른 직군들이 모여 진행하는 팀 프로젝트에서는 한 명 한 명의 이탈이 치명적이에요.
              때문에 이로 인한 피해를 방지하는 차원에서 보증금 개념으로 회비를 받고 있어요. 프로젝트
              공식 일정이 종료된 후에 돌려 드려요.
              <br />
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='text-feedback-information-dark decoration-feedback-information-dark underline'
              >
                젝트 회비 관련
              </a>
            </p>
          </div>
        </div>
      </section>
        <BlockButton
          size='lg'
          style='solid'
          hierarchy='accent'
          rightIcon={<Icon name='forward' size='md' fillColor='fill-object-static-inverse-hero-dark'/>}
          className='min-w-[26.25rem] cursor-pointer'
        >
        젝트 3기 지원하기
        </BlockButton>
      
    </div>
  );
}

export default Apply;
