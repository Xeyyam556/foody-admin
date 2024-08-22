"use client"
import styles from "./dashboard.module.css"
import MyChartsOffer from "../../companents/charts/MyChartsOffer"
import MyChartsTotalSalary from "../../companents/charts/MyChartsTotalSalary"
import MyChartsAssignedRisk from "../../companents/charts/MyChartsAssignedRisk"
import MyChartsAssignedAction from "../../companents/charts/MyChartsAssignedAction"
export default function Dashboard(){
    return(
        <>
        <div className={styles.countainer}>
            <div className={styles.order} >
                <h1>Order</h1>
                <div className={styles.chartOffer}>
                <MyChartsOffer  />
                </div>
            </div>
            <div className={styles.totalSalary}>
                <h1>Total Salary</h1>
                <div className={styles.chartTotalSalary}>
                    <MyChartsTotalSalary />
                </div>

            </div>
            <div className={styles.assignedRisk}>
            <h1>Asigned Risk</h1>
            <div className={styles.chartAssignedRIsk}>
              <MyChartsAssignedRisk />
            </div>

            </div>
            <div className={styles.assignedActionItems}>
                <h1>Assigned Action İtems</h1>
                <div className={styles.chartAssignedAction}>
                    <MyChartsAssignedAction />

                </div>

            </div>
        </div>
        </>
    )
}