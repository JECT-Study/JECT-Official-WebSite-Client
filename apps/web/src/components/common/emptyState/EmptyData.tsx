import Label from "@/components/common/label/Label";

function EmptyData() {
  return (
    <div className='px-(--gap-2xl) py-(--gap-4xl) text-center'>
      <Label hierarchy='stronger' weight='bold' textColor='text-object-assistive-dark'>
        아직 데이터가 없어요
      </Label>
    </div>
  );
}

export default EmptyData;
