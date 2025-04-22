import CheckBox from '@/components/common/checkbox/CheckBox';
import { Data } from '@/pages/admin/AdminApply';

interface TableRowProps {
  data: Data;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

function TableRow({ data, isSelected, onToggle }: TableRowProps) {
  const handleChange = () => {
    onToggle(data.id);
  };

  return (
    <tr
      tabIndex={0}
      className={`${isSelected ? 'bg-feedback-trans-information-dark interaction-default-normal' : 'interaction-default-subtle'} *:border-border-assistive-dark *:border *:not-first:px-(--gap-3xs) *:not-first:py-(--gap-5xs) *:first:border-l-0 *:first:text-center *:last:border-r-0`}
    >
      <td>
        <CheckBox checked={isSelected} isIndeterminate={false} onChange={handleChange} />
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
