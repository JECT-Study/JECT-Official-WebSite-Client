import { BlockButton, Icon, Title } from "@ject/jds";
import { captureException } from "@sentry/react";
import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import Footer from "@/components/common/footer/Footer";
import GlobalNavigationBar from "@/components/gnb/GlobalNavigationBar";
import PagesContainer from "@/components/layout/PagesContainer";

function NonSpecificError() {
  const error = useRouteError() as Error | undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      captureException(error);
    }
  }, [error]);

  return (
    <div>
      <GlobalNavigationBar />
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
                    현재 페이지를 불러오는 중 <br className='desktop:hidden tablet:hidden' /> 문제가
                    생겼습니다
                  </Title>
                </div>
                <span className='textStyle-body-md-normal text-center text-(--sematic-object-bold)'>
                  일시적인 오류일 수 있으니, 잠시 후 다시 시도해주세요.
                  <br />
                  문제가 지속된다면 jectofficial@ject.kr 로 문의해주세요.
                </span>
              </div>
              <BlockButton.Basic
                hierarchy='accent'
                size='lg'
                suffixIcon='arrow-right-line'
                onClick={() => void navigate("/")}
              >
                메인 페이지로
              </BlockButton.Basic>
            </div>
          </div>
        </div>
      </PagesContainer>
      <Footer />
    </div>
  );
}

export default NonSpecificError;
