import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonationChart } from "./donation-chart";

const donationHistory = [
  {
    id: 1,
    organization: "Global Health Initiative",
    amount: 100,
    date: "2023-03-15",
  },
  { id: 2, organization: "Education for All", amount: 50, date: "2023-04-02" },
  {
    id: 3,
    organization: "Clean Water Project",
    amount: 75,
    date: "2023-05-10",
  },
];

export default function Dashboard() {
  return (
    <Tabs defaultValue="donations">
      <TabsList>
        <TabsTrigger value="donations">Donation History</TabsTrigger>
        <TabsTrigger value="usage">Donation Usage</TabsTrigger>
      </TabsList>
      <TabsContent value="donations">
        <Card>
          <CardHeader>
            <CardTitle>Your Donations</CardTitle>
            <CardDescription>
              A history of your charitable contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Organization</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.organization}</td>
                    <td>₹{donation.amount}</td>
                    <td>{donation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="usage">
        <Card>
          <CardHeader>
            <CardTitle>Donation Usage</CardTitle>
            <CardDescription>
              How your donations are being utilized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonationChart />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
