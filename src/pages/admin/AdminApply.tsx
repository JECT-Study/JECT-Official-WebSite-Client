import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Chip from '@/components/admin/chip/Chip';
import TableRow from '@/components/admin/table/TableRow';
import TabView from '@/components/admin/tabView/TabView';
import TabViewItem from '@/components/admin/tabView/TabViewItem';
import BlockButton from '@/components/common/button/BlockButton';
import CheckBox from '@/components/common/checkbox/CheckBox';
import Icon from '@/components/common/icon/Icon';
import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';

export interface Data {
  id: number;
  name: string;
  position: string;
  phoneNumber: string;
  email: string;
  file: string;
}

const positions = [
  { key: 'all', label: '전체' },
  { key: 'fe', label: '프론트엔드 개발자' },
  { key: 'be', label: '백엔드 개발자' },
  { key: 'pm', label: '프로덕트 매니저' },
  { key: 'pd', label: '프로덕트 디자이너' },
];

const headers = ['이름', '포지션', '휴대폰 번호', '이메일', '첨부파일'];

function AdminApply() {
  const [selectItems, setSelectItems] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const data: Data[] = [
    {
      id: 1,
      name: '셀 텍스트',
      position: '셀 텍스트',
      phoneNumber: '셀 텍스트',
      email: '셀 텍스트',
      file: '셀 텍스트',
    },
    {
      id: 2,
      name: '셀 텍스트',
      position: '셀 텍스트',
      phoneNumber: '셀 텍스트',
      email: '셀 텍스트',
      file: '셀 텍스트',
    },
    {
      id: 3,
      name: '셀 텍스트',
      position: '셀 텍스트',
      phoneNumber: '셀 텍스트',
      email: '셀 텍스트',
      file: '셀 텍스트',
    },
    {
      id: 4,
      name: '셀 텍스트',
      position: '셀 텍스트',
      phoneNumber: '셀 텍스트',
      email: '셀 텍스트',
      file: '셀 텍스트',
    },
  ];

  const isAllChecked = selectItems.length === data.length && data.length > 0;
  const isIndeterminate = selectItems.length > 0 && selectItems.length < data.length;

  const handleToggleItem = (id: number) => {
    setSelectItems(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  const handleToggleAll = (checked: boolean) => {
    setSelectItems(checked ? data.map(item => item.id) : []);
  };

  const handleParam = (key: string, value: string) => {
    setSearchParams(prevParams => {
      const newSearchParams = new URLSearchParams(prevParams);

      newSearchParams.set(key, value);
      return newSearchParams;
    });
  };

  useEffect(() => {
    const tabView = searchParams.get('tabView');
    const position = searchParams.get('position');

    if (!tabView || !position) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('tabView', 'complete');
      newSearchParams.set('position', 'all');

      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className='bg-surface-standard-dark gap-6xl flex w-[calc(100dvw-13.75rem)] flex-col p-(--gap-7xl)'>
      <section className='gap-4xl flex items-center'>
        <Title hierarchy='stronger'>지원서 관리</Title>
        <TabView>
          <TabViewItem
            isActive={searchParams.get('tabView') === 'complete'}
            onClick={() => handleParam('tabView', 'complete')}
          >
            제출 완료
          </TabViewItem>
          <TabViewItem
            isActive={searchParams.get('tabView') === 'temp'}
            onClick={() => handleParam('tabView', 'temp')}
          >
            임시 저장
          </TabViewItem>
        </TabView>
      </section>
      <section className='gap-4xl flex flex-col'>
        <div className='flex justify-between'>
          <div className='gap-md flex items-center'>
            <Title hierarchy='normal'>제출 완료된 지원서</Title>
            <Label hierarchy='strong' weight='normal' textColor='text-object-neutral-dark'>
              {data.length}개의 항목
            </Label>
          </div>
          <div className='gap-md flex'>
            <BlockButton size='xs' hierarchy='accent' style='solid'>
              선택한 항목 삭제
            </BlockButton>
            <BlockButton
              size='xs'
              hierarchy='secondary'
              style='solid'
              rightIcon={
                <Icon name='download' size='2xs' fillColor='fill-object-static-inverse-hero-dark' />
              }
            >
              내려받기(csv)
            </BlockButton>
          </div>
        </div>
        <div className='gap-2xl flex flex-col'>
          <div className='gap-xs flex'>
            {positions.map(({ key, label }) => (
              <Chip
                key={key}
                isActive={searchParams.get('position') === key}
                onClick={() => handleParam('position', key)}
              >
                {label}
              </Chip>
            ))}
          </div>
          <div>
            <table className='w-full table-auto'>
              <thead>
                <tr className='text-object-alternative-dark *:not-first:px-(--gap-3xs) *:not-first:py-(--gap-4xs) *:not-first:text-left'>
                  <th className='w-[2.5rem]'>
                    {isIndeterminate ? (
                      <CheckBox
                        isIndeterminate={true}
                        checked={false}
                        onChange={() => handleToggleAll(!isAllChecked)}
                      />
                    ) : (
                      <CheckBox
                        isIndeterminate={false}
                        checked={isAllChecked}
                        onChange={() => handleToggleAll(!isAllChecked)}
                      />
                    )}
                  </th>
                  {headers.map(header => (
                    <th key={header} className='body-sm'>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='body-sm text-object-hero-dark'>
                {data.map(item => (
                  <TableRow
                    key={item.id}
                    data={item}
                    isSelected={selectItems.includes(item.id)}
                    onToggle={handleToggleItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminApply;
