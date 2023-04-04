import { CheckboxProps } from '../../models';

export const CheckFree = ({ checked, onChange }: CheckboxProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <>
      <input
        id="highload2"
        name="highload2"
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
      />
      <label htmlFor="highload2" className="lb1"></label>
    </>
  );
};
