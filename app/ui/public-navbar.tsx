import { ThemeToggle } from "@/components/ui/theme-toggle";
import { H3 } from "@/components/ui/typography";

export default async function PublicNavbar() {
  return (
    <div className="grid grid-cols-8 lg:grid-cols-12 gap-4 items-center p-2 border-b-2 sticky top-0 backdrop-blur">
      <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
        <H3>Echoize</H3>
      </div>
      <div className="col-span-4 lg:col-span-10 flex justify-start items-center"></div>
      <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
