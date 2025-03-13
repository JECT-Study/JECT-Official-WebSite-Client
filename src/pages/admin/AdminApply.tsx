import { useState } from 'react';

import Chip from '@/components/admin/chip/Chip';
import TableRow from '@/components/admin/table/TableRow';
import TabView from '@/components/admin/tabView/TabView';
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

function AdminApply() {
  // TODO: 체크박스 전체 선택 기능
  const [selectItems, setSelectItems] = useState<Data[]>([]);
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

  const handleAddItem = (id: number) => {
    const item = data.filter(item => item.id === id);
    setSelectItems([...selectItems, ...item]);
  };

  const handlerDeleteItem = (id: number) => {
    const items = selectItems.filter(item => item.id !== id);
    setSelectItems(items);
  };

  return (
    <div className='bg-surface-standard-dark gap-6xl flex w-[calc(100dvw-13.75rem)] flex-col p-(--gap-7xl)'>
      <section className='gap-4xl flex items-center'>
        <Title hierarchy='stronger'>지원서 관리</Title>
        <TabView leftText='제출 완료' rightText='임시 저장' />
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
            <Chip param='all'>전체</Chip>
            <Chip param='fe'>프론트엔드 개발자</Chip>
            <Chip param='be'>백엔드 개발자</Chip>
            <Chip param='pm'> 프로덕트 매니저</Chip>
            <Chip param='pd'>프로덕트 디자이너</Chip>
          </div>
          <div>
            <table className='w-full table-auto'>
              <thead>
                <tr className='text-object-alternative-dark *:not-first:px-(--gap-3xs) *:not-first:py-(--gap-4xs) *:not-first:text-left'>
                  <th className='w-[2.5rem]'>
                    <CheckBox />
                  </th>
                  <th className='body-sm'>이름</th>
                  <th className='body-sm'>포지션</th>
                  <th className='body-sm'>휴대폰 번호</th>
                  <th className='body-sm'>이메일</th>
                  <th className='body-sm'>첨부파일 </th>
                </tr>
              </thead>
              <tbody className='body-sm text-object-hero-dark'>
                {data.map(item => (
                  <TableRow
                    key={item.id}
                    data={item}
                    onAdd={handleAddItem}
                    onDelete={handlerDeleteItem}
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
