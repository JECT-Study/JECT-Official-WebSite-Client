import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import TableRow from './TableRow';

const meta: Meta<typeof TableRow> = {
  title: 'Components/TableRow',
  component: TableRow,
  argTypes: {
    data: {
      description: '행 하나에 들어올 데이터입니다.',
    },
    isSelected: {
      control: 'boolean',
      description: '행의 선택 여부입니다.',
    },
    onToggle: {
      description:
        'TableRow가 Change 이벤트 발생 시 호출되는 함수입니다. 선택된 행의 id 정보가 필요할 때 사용됩니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableRow>;

export const TableRowStory: Story = {
  args: {
    data: {
      id: 1,
      name: '셀 텍스트',
      position: '셀 텍스트',
      phoneNumber: '셀 텍스트',
      email: '셀 텍스트',
      file: '셀 텍스트',
    },
    isSelected: false,
    onToggle: action('선택'),
  },
};

export const TableRowToggleStory: Story = {
  name: 'TableRow Toggle Story',
  render: function Render() {
    const [selectItems, setSelectItems] = useState<number[]>([]);
    const data = [
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

    const handleToggleItem = (id: number) => {
      setSelectItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
      );
    };

    return (
      <table className='w-full'>
        <thead>
          <tr>
            <th className='w-[2.5rem]'>선택</th>
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
              isSelected={selectItems.includes(item.id)}
              onToggle={handleToggleItem}
            />
          ))}
        </tbody>
      </table>
    );
  },
};
