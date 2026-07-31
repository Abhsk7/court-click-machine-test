"use client";

import Sidebar from "./Sidebar";
import styles from "./DashboardShell.module.css";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <Sidebar />
        <main className={styles.panel}>{children}</main>
      </div>
      <div className={styles.mobileNavSpacer} />
      <div className={styles.mobileNavWrap}>
        <Sidebar mobile />
      </div>
    </div>
  );
}
