import { useSearchParams } from 'react-router-dom';

interface TabViewProps {
  leftText: string;
  rightText: string;
}

function TabView({ leftText, rightText }: TabViewProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStyle = 'bg-fill-assistive-dark text-object-hero-dark interaction-default-normal';
  const inactiveStyle = 'text-object-assistive-dark interaction-default-subtle';

  const handlerClick = (text: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('tabView', text.replace(' ', ''));
    setSearchParams(newSearchParams);
  };

  return (
    <div className='bg-surface-deeper-dark radius-sm *:label-bold-md *:radius-2xs inline-flex p-(--gap-5xs) *:px-(--gap-md) *:py-(--gap-4xs)'>
      <button
        onClick={() => handlerClick(leftText)}
        className={`${searchParams.get('tabView') === leftText.replace(' ', '') ? activeStyle : inactiveStyle} `}
      >
        {leftText}
      </button>
      <button
        onClick={() => handlerClick(rightText)}
        className={`${searchParams.get('tabView') === rightText.replace(' ', '') ? activeStyle : inactiveStyle}`}
      >
        {rightText}
      </button>
    </div>
  );
}

export default TabView;
