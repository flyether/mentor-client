import { CheckboxProps } from '../../models';

export const CheckInterviews = ({ checked, onChange }: CheckboxProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <>
      <input
        id="highload1"
        name="highload1"
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
      />
      <label htmlFor="highload1" className="lb1"></label>
    </>
  );
};
