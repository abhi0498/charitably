import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseAllocation } from "./expense-allocation";

export default function OrganizationDashboard() {
  return (
    <Tabs defaultValue="funding">
      <TabsList>
        <TabsTrigger value="funding">Funding Requests</TabsTrigger>
        <TabsTrigger value="reporting">Reporting</TabsTrigger>
      </TabsList>
      <TabsContent value="funding">{/* <FundingRequests /> */}</TabsContent>
      <TabsContent value="reporting">
        <ExpenseAllocation />
      </TabsContent>
    </Tabs>
  );
}
