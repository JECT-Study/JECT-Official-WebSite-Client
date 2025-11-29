import { isMobile } from "react-device-detect";

import coneImage from "@/assets/images/cone.png";
import Footer from "@/components/common/footer/Footer";
import MobileFooter from "@/components/common/footer/MobileFooter";
import PagesContainer from "@/components/layout/PagesContainer";

function Maintenance() {
  return (
    <div>
      <PagesContainer>
        <div className='gap-4xl absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center'>
          <img src={coneImage} alt='물음표 이미지' className='w-[9.75rem]' />
          <div className='gap-md flex flex-col text-center'>
            <p className='title-03 text-object-hero-dark'>현재 서비스 점검중이에요</p>
            <p className='label-lg text-object-neutral-dark'>예상 점검 시간 : 05:00 ~ 07:00</p>
          </div>
        </div>
      </PagesContainer>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default Maintenance;
