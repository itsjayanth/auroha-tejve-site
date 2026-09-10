import type { Metadata } from "next";
import LaunchExperience from "@/components/launch/launch-experience";
import { launch, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Launch Day",
  description: `Watch ${siteConfig.name} go live, followed by the launch of our first product, ${launch.appName}.`,
};

export default function LaunchPage() {
  return <LaunchExperience />;
}
