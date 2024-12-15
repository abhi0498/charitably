import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundingRequests } from "./funding-requests";
import { ExpenseAllocation } from "./expense-allocation";

export default function OrganizationDashboard() {
  return (
    <Tabs defaultValue="funding">
      <TabsList>
        <TabsTrigger value="funding">Funding Requests</TabsTrigger>
        <TabsTrigger value="reporting">Reporting</TabsTrigger>
      </TabsList>
      <TabsContent value="funding">
        <FundingRequests />
      </TabsContent>
      <TabsContent value="reporting">
        <ExpenseAllocation />
      </TabsContent>
    </Tabs>
  );
}
