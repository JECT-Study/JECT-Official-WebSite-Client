import { BlockButton, Hero, Title } from "@jects/jds";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/common/footer/Footer";
import GlobalNavigationBar from "@/components/gnb/GlobalNavigationBar";
import PagesContainer from "@/components/layout/PagesContainer";

function NotFoundError() {
  const navigate = useNavigate();
  return (
    <div>
      <GlobalNavigationBar />
      <PagesContainer>
        <div className='tablet:pt-[46px] desktop:pt-[56px] flex h-dvh w-full justify-center pt-[44px]'>
          <div className='h-full py-(--semantic-margin-2xl)'>
            <div className='h-full px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
              <div className='flex h-full w-full flex-col items-center justify-center gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
                <div className='text-(--semantic-feedback-notifying-normal)'>
                  <Hero size='lg' color='inherit'>
                    404
                  </Hero>
                </div>
                <div className='flex flex-col items-center justify-center gap-(--semantic-spacing-16)'>
                  <div className='flex gap-(--semantic-spacing-6)'>
                    <Title size='lg' textAlign='center'>
                      페이지를 찾을 수 없습니다
                    </Title>
                  </div>
                  <span className='textStyle-body-md-normal text-(--semantic-object-bold)'>
                    잘못된 주소를 입력했거나, 삭제된 페이지예요.
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
        </div>
      </PagesContainer>
      <Footer />
    </div>
  );
}

export default NotFoundError;
