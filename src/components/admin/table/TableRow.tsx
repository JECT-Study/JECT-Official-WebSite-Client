import { ChangeEvent, useEffect, useState } from 'react';

import CheckBox from '@/components/common/checkbox/CheckBox';
import { Data } from '@/pages/admin/AdminApply';

interface TableRowProps {
  data: Data;
  onAdd: (id: number) => void;
  onDelete: (id: number) => void;
}

function TableRow({ data, onAdd, onDelete }: TableRowProps) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (isChecked) {
      onAdd(data.id);
    } else {
      onDelete(data.id);
    }
  }, [isChecked]);

  return (
    <tr
      tabIndex={0}
      className={`${isChecked ? 'bg-feedback-trans-information-dark interaction-default-normal' : 'interaction-default-subtle'} *:border-border-assistive-dark *:border *:not-first:px-(--gap-3xs) *:not-first:py-(--gap-5xs) *:first:border-l-0 *:first:text-center *:last:border-r-0`}
    >
      <td>
        <CheckBox checked={isChecked} onChange={handleChange} />
      </td>
      <td className=''>{data.name}</td>
      <td>{data.position}</td>
      <td>{data.phoneNumber}</td>
      <td>{data.email}</td>
      <td>{data.file}</td>
    </tr>
  );
}

export default TableRow;
