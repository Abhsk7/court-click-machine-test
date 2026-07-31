"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  CopyOutlined,
  BankOutlined,
  EllipsisOutlined,
  UserOutlined as ProfileIcon,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { key: "/orders", icon: <AppstoreOutlined />, label: "Dashboard" },
  { key: "/eligible-users", icon: <TeamOutlined />, label: "Eligible Users" },
  { key: "/clerks", icon: <UserOutlined />, label: "Clerks" },
  { key: "/", icon: <FileTextOutlined />, label: "Documents" },
  { key: "/districts", icon: <CopyOutlined />, label: "Districts" },
  { key: "/courts", icon: <BankOutlined />, label: "Courts" },
];

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className={mobile ? styles.sidebarMobile : styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoBadge}>
          <span className={styles.logoBadgeInner} />
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.key;
          return (
            <button
              key={item.key}
              className={active ? `${styles.navItem} ${styles.active}` : styles.navItem}
              onClick={() => router.push(item.key)}
              title={item.label}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              {active && <span className={styles.activeBar} />}
              <span className={styles.navIcon}>{item.icon}</span>
            </button>
          );
        })}
        <button className={styles.navItem} title="More" aria-label="More">
          <span className={styles.navIcon}>
            <EllipsisOutlined />
          </span>
        </button>
      </nav>

      <div className={styles.footer}>
        <button className={styles.avatar} title="Profile" aria-label="Profile">
          <ProfileIcon />
        </button>
      </div>
    </aside>
  );
}
