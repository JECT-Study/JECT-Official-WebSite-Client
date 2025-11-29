import coneImage from "@/assets/images/cone.png";
import MobileFooter from "@/components/common/footer/MobileFooter";
import Logo from "@/components/common/logo/Logo";

function TempMobile() {
  return (
    <div className='relative'>
      <header className='bg-surface-standard-dark border-border-assistive-dark border-b px-(--gap-md) py-(--gap-xs)'>
        <Logo height={18} fillColor='fill-object-hero-dark' />
      </header>
      <div className='gap-2xl bg-surface-standard-dark flex min-h-dvh flex-col items-center justify-center'>
        <img src={coneImage} alt='물음표 이미지' className='w-[6rem]' />
        <div className='gap-3xs flex flex-col text-center'>
          <p className='title-02 text-object-hero-dark'>
            젝트 웹사이트는 <br /> PC로 이용해주세요
          </p>
          <p className='label-sm text-object-neutral-dark'>
            현재 모바일에서는 접근할 수 없어요. <br /> 불편함을 드려 죄송합니다.
          </p>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default TempMobile;
