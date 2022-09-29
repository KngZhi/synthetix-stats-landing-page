import { TooltipProps } from 'recharts';
import { formatMoney } from '../../../constants/format';
import styles from './Tooltip.module.css'

// date
// tvl
// staking debt pool
// wrapper
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {


    


  if (active) {

    const debtVal = payload && payload[2].value
    const wrapperVal = payload && payload[1].value
    const loanVal = payload && payload[0].value
    const tvl = debtVal && wrapperVal && loanVal ? debtVal + wrapperVal + loanVal : 0
  
    return (
      <div className={styles.TTwrap}>
        <p className={styles.TTlabel}>{label}</p>
        <h6 className={styles.TTheading}>TVL</h6>
        <p className={styles.TTtvl}>{formatMoney.format(tvl)}</p>
        <h6 className={styles.TTheading}>Staking Debt Pool</h6>
        <p className={styles.TTdebt}>{debtVal ? formatMoney.format(debtVal) : 0}</p>
        <h6 className={styles.TTheading}>Wrappers</h6>
        <p className={styles.TTwrapper}>{wrapperVal ? formatMoney.format(wrapperVal) : 0}</p>
        <h6 className={styles.TTheading}>Loans</h6>
        <p className={styles.TTloans}>{loanVal ? formatMoney.format(loanVal) : 0}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip