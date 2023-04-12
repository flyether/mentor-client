import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import cnBind from 'classnames/bind';
import styles from '../Authorization/registration/registration.module.css';
import stylesForm from './Form.module.css';
import { setUpdateSkills } from '../../store/slices/UserUpdateSlice';
import { skillsList } from './utils/skillsList';
import { Button } from '../atoms/Button/Button';

const cx = cnBind.bind(styles);

const MentorSkills = () => {
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.user);
  const [skillsInput, setSkillsInput] = useState('');
  const [focusStyleSkills, setFocusStylesSkills] = useState(false);
  const [showSkillsList, setShowSkillsList] = useState(false);
  const [filteredSkillsList, setFilteredSkillsList] = useState(skillsList);
  const [selectedSkillsList, setSelectedSkillsList] = useState<string[]>([]);
  const {
    register,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (skills) {
      skills.forEach((skill) => {
        if (!selectedSkillsList.includes(skill)) {
          setSelectedSkillsList([...selectedSkillsList, skill]);
        }
      });
    }
    console.log(selectedSkillsList);
    dispatch(setUpdateSkills(selectedSkillsList));
  }, [selectedSkillsList, skills]);

  const handleSkillsChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(selectedSkillsList);
    const value = event.target.value;
    setSkillsInput(value);
    setShowSkillsList(value.length > 0);
    setFilteredSkillsList(
      skillsList.filter((skill) => skill.toLowerCase().startsWith(value.toLowerCase()))
    );
  };

  const handleSkillsSelect = (skill: string) => {
    setSkillsInput(skill);
    setShowSkillsList(false);
    if (!selectedSkillsList.includes(skill)) {
      setSelectedSkillsList([...selectedSkillsList, skill]);
    }
  };

  const handleAdd = () => {
    if (!selectedSkillsList.includes(skillsInput)) {
      setSelectedSkillsList([...selectedSkillsList, skillsInput]);
    }
    setShowSkillsList(false);
  };
  const handleDel = (index: number) => {
    const newSkillsList = [...selectedSkillsList];
    newSkillsList.splice(index, 1);
    setSelectedSkillsList(newSkillsList);
  };

  const handleBlur = () => {
    setFocusStylesSkills(false);
    // setShowSkillsList(false);
  };

  return (
    <>
      <div className={stylesForm.title}>Ключевые навыки</div>
      <div className={stylesForm.skills}>
        <div className={stylesForm.text}>
          Укажи до 15 навыков. Пусть менти поймет, что ты именно тот, кто ему нужен
        </div>
        <div onBlur={() => setShowSkillsList(false)} className={stylesForm.row}>
          <input
            type="text"
            value={skillsInput}
            className={cx(styles.input, {
              [styles.inputError]: errors.skills,
              [styles.focusStyle]: focusStyleSkills,
            })}
            {...register('skills', {
              minLength: 2,
              required: 'Поле «Имя» должно быть заполнено обязательно',
            })}
            onChange={handleSkillsChange}
            onFocus={() => setFocusStylesSkills(true)}
            onBlur={handleBlur}
            placeholder="Начни вводить"
          />
          <Button btnType="outlined" onClick={handleAdd}>
            добавить
          </Button>
        </div>
        {showSkillsList && (
          <ul className={stylesForm.skillsList}>
            {filteredSkillsList.map((skill, index) => (
              <li
                id={(index + 174).toString()}
                key={skill}
                onClick={() => handleSkillsSelect(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
        <div className={stylesForm.skills__container}>
          {selectedSkillsList.map((skill, index) => (
            <div id={(index + 164).toString()} key={skill} className={stylesForm.skill__container}>
              <li onClick={() => handleSkillsSelect(skill)}>{skill}</li>{' '}
              <button className={stylesForm.trash} type="button" onClick={() => handleDel(index)} />{' '}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MentorSkills;
