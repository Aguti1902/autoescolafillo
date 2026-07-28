import { HomePage } from "@/components/home/HomePage";
import { getSiteData } from "@/lib/data";

export default async function Page() {
  const data = await getSiteData();
  return <HomePage data={data} />;
}
