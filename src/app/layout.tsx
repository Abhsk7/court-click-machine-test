import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";

export const metadata: Metadata = {
  title: "Certified True Copy | Court Click",
  description: "Manage Your CTC Orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5c1f44",
                borderRadius: 10,
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                colorLink: "#5c1f44",
              },
              components: {
                Button: {
                  controlHeight: 38,
                  borderRadius: 20,
                },
                Modal: {
                  borderRadiusLG: 16,
                },
                Tag: {
                  borderRadiusSM: 20,
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
