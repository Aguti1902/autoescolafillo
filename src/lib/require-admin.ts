import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
