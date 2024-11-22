"use client"
import MyChartsOffer from "../../companents/charts/MyChartsOffer"
import MyChartsTotalSalary from "../../companents/charts/MyChartsTotalSalary"
import MyChartsAssignedRisk from "../../companents/charts/MyChartsAssignedRisk"
import MyChartsAssignedAction from "../../companents/charts/MyChartsAssignedAction"
import styles from "./dashboard.module.css"
import spinGif from "../image/spin2.gif"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Verilerin yüklenmesini simüle etmek için bir `useEffect` ekleyebilirsiniz
    useEffect(() => {
        // Simüle edilmiş API çağrısı (örneğin, 2 saniye sonra veriler geldiğinde setDataLoaded true yapılır)
        const timer = setTimeout(() => {
            setDataLoaded(true);
            setLoading(false); // Veriler yüklendiğinde loading false yapılır
        }, 1000); // 2 saniye sonra veriler yüklendi kabul edilir

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading || !dataLoaded ? (
                <div className={styles.spinnerContainer}>
                    <Image src={spinGif} alt="Loading..." className={styles.spinner} />
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.order}>
                        <h1>Order</h1>
                        <div className={styles.chartOffer}>
                            <MyChartsOffer />
                        </div>
                    </div>
                    <div className={styles.totalSalary}>
                        <h1>Total Salary</h1>
                        <div className={styles.chartTotalSalary}>
                            <MyChartsTotalSalary />
                        </div>
                    </div>
                    <div className={styles.assignedRisk}>
                        <h1>Assigned Risk</h1>
                        <div className={styles.chartAssignedRisk}>
                            <MyChartsAssignedRisk />
                        </div>
                    </div>
                    <div className={styles.assignedActionItems}>
                        <h1>Assigned Action Items</h1>
                        <div className={styles.chartAssignedAction}>
                            <MyChartsAssignedAction />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
