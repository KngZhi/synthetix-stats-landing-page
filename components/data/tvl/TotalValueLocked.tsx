import styles from "./TotalValueLocked.module.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";
import { formatMoney } from "../../../constants/format";
import CustomToolTip from './tooltip'
import { RiInformationFill } from "react-icons/ri"
import InfoTooltip from '../../infoToolTip/InfoTooltip'
import Dropdown from '../../dropdown/Dropdown'


interface TVL {
  dayDataOvm: any[];
  dayDataAll: any[];
  weekDataOvm: any[];
  weekDataAll: any[];
  monthDataOvm: any[];
  monthDataAll: any[];
  dayDataMain: any[];
  weekDataMain: any[];
  monthDataMain: any[];
  totalDebtOvm: number;
  totalDebtMain: number;
  totalWrapperOvm: number;
  totalWrapperMain: number;
  totalLoanOvm: number;
  totalLoanMain: number;
  click: number;
}


const TotalValueLocked = ({
  click,
  dayDataOvm,
  dayDataMain,
  dayDataAll,
  weekDataOvm,
  weekDataMain,
  weekDataAll,
  monthDataOvm,
  monthDataMain,
  monthDataAll,
  totalDebtOvm,
  totalDebtMain,
  totalWrapperOvm,
  totalWrapperMain,
  totalLoanOvm,
  totalLoanMain
}: TVL) => {

  const optionMap = [
    { value: 1, label: "1 Day" },
    { value: 2, label: "1 Week" },
    { value: 3, label: "1 Month" }
  ]



  const [timeFrame, setTimeFrame] = useState(1);

  const handleActive = (option: any) => {
    setTimeFrame(option.value);
  };

  // click === 1 ? mainnet : click === 10 ? optimism : click === 21 ? all networks

  const totalValueLockedOvm = formatMoney.format(totalDebtOvm + totalWrapperOvm + totalLoanOvm)
  const totalValueLockedMain = formatMoney.format(totalDebtMain + totalWrapperMain + totalLoanMain)
  const totalValueLockedAll = formatMoney.format((totalDebtMain + totalDebtOvm) + (totalWrapperMain + totalWrapperOvm) + (totalLoanMain + totalLoanOvm))

  const allDebt = formatMoney.format(totalDebtMain + totalDebtOvm)
  const allWrapper = formatMoney.format(totalWrapperMain + totalWrapperOvm)
  const allLoans = formatMoney.format(totalLoanMain + totalLoanOvm)

  const ovmDebt = formatMoney.format(totalDebtOvm)
  const ovmWrapper = formatMoney.format(totalWrapperOvm)
  const ovmLoan = formatMoney.format(totalLoanOvm)

  const mainDebt = formatMoney.format(totalDebtMain)
  const mainWrapper = formatMoney.format(totalWrapperMain)
  const mainLoan = formatMoney.format(totalLoanMain)

  const ovmData = timeFrame === 1 ? dayDataOvm : timeFrame === 2 ? weekDataOvm : monthDataOvm
  const mainData = timeFrame === 1 ? dayDataMain : timeFrame === 2 ? weekDataMain : monthDataMain
  const allData = timeFrame === 1 ? dayDataAll : timeFrame === 2 ? weekDataAll : monthDataAll

  const ttInfo = `Total Value Locked within SNX Ecosystem. Updated every 15 minutes`

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.titleRow}>
            <h3 className={styles.tvl}>SNX & Debt Minted</h3>
            <InfoTooltip content={ttInfo}>
              <span
                className={styles.icon}
              >
                <RiInformationFill />
              </span>
            </InfoTooltip>

          </div>
          <p className={styles.values}>{click === 1 ? totalValueLockedMain : click === 10 ? totalValueLockedOvm : totalValueLockedAll}</p>
        </div>

        <div className={styles.selectors}>
          <div className={styles.mainMenu}>
            {optionMap.map((option) => (
              <button
                key={option.value}
                onClick={() => handleActive(option)}
                className={
                  option.value === timeFrame ? styles.button : styles.inactive
                }
              >
                {option.label}
              </button>
            ))}

          </div>
          <div className={styles.mobileMenu}>
            <Dropdown instanceId={101} options={optionMap} update={(e) => handleActive(e)} placeholder={optionMap[0].label} />

          </div>
        </div>
      </div>

      <div className={styles.responsive}>
        <ResponsiveContainer>
          <AreaChart
            data={click === 1 ? mainData : click === 10 ? ovmData : allData}


          >
            <defs>
              <linearGradient id="wrapperL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ED1EFF" stopOpacity={1} />
                <stop offset="95%" stopColor="#0b0b22" stopOpacity={0.1} />


              </linearGradient>
              <linearGradient id="debtL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#31D8A4" stopOpacity={1} />
                <stop offset="95%" stopColor="#0b0b22" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="loanL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fff" stopOpacity={1} />
                <stop offset="95%" stopColor="#0b0b22" stopOpacity={0.1} />
              </linearGradient>

              <filter id="shadow" height="200%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" />
              </filter>



            </defs>
            <XAxis dataKey="date" fontSize={14} interval={"preserveStartEnd"} />
            <YAxis
              scale={"linear"}
              hide={true}
              interval="preserveStartEnd"
              tickCount={5}

            />

            <Area
              type="linear"
              dataKey="debt"
              fill="url(#debtL)"
              fillOpacity={0.6}
              stackId={2}
              strokeWidth={5}
              stroke="#31D8A4"
            />
            <Tooltip
              content={<CustomToolTip />}
            />

          </AreaChart>

        </ResponsiveContainer>
      </div>

      {/* <div className={styles.bottom}>
        <div className={styles.debtPool}>
          <h5 className={styles.stakingColor}>SNX Staked</h5>
          <p className={styles.debtWrapVal}>{click === 1 ? mainDebt : click === 10 ? ovmDebt : allDebt}</p>
        </div>

        <div className={styles.wrapper}>
          <h5 className={styles.wrapperColor}>Wrappers</h5>
          <p className={styles.debtWrapVal}>{click === 1 ? mainWrapper : click === 10 ? ovmWrapper : allWrapper}</p>
        </div>

        <div className={styles.loan}>
          <h5 className={styles.loanColor}>Loans</h5>
          <p className={styles.debtWrapVal}>{click === 1 ? mainLoan : click === 10 ? ovmLoan : allLoans}</p>
        </div>
      </div> */}
    </div>
  );
};

export default TotalValueLocked;
