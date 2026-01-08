import { Icon, Title } from "@ject/jds";

import Footer from "@/components/common/footer/Footer";
import PagesContainer from "@/components/layout/PagesContainer";

function Maintenance() {
  return (
    <div>
      <PagesContainer>
        <div className='desktop:py-(--semantic-margin-2xl) tablet:py-(--semantic-margin-2xl) flex h-dvh w-full justify-center pt-14'>
          <div className='h-full px-(--semantic-margin-lg) pt-(--semantic-spacing-0) pb-(--semantic-spacing-80)'>
            <div className='desktop:w-[600px] tablet:w-[608px] mobile:w-[320px] flex h-full flex-col items-center justify-center gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
              <Icon
                className='h-10 w-10 text-(--semantic-feedback-notifying-normal)'
                name='error-warning-line'
              />
              <div className='flex flex-col items-center justify-center gap-(--semantic-spacing-16)'>
                <div className='flex items-center justify-center gap-(--semantic-spacing-6)'>
                  <Title size='lg' textAlign='center' className='text-center'>
                    현재 서비스를 점검 중입니다
                  </Title>
                </div>
                <span className='textStyle-body-md-normal text-center text-(--semantic-object-bold)'>
                  서비스 점검은 가능한 빠르게 마무리 될 예정이며,
                  <br />
                  필요 시 jectofficial@ject.kr 로 문의해주세요.
                </span>
              </div>
            </div>
          </div>
        </div>
      </PagesContainer>
      <Footer />
    </div>
  );
}

export default Maintenance;
