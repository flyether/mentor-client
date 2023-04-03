import { Step } from '../../components/atoms/Step/Step';
import { stepProps } from '../../data';

import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <>
      <Step {...stepProps} />
    </>
  );
};

export default WelcomePage;
