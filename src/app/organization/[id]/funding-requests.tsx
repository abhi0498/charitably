"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Event, FundingRequest, Organization } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";

const FundingRequests = ({
  organizationData,
}: {
  organizationData: Organization & {
    fundingRequests: FundingRequest[];
    events: Event[];
  };
}) => {
  const { data: session } = useSession();
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold ">Current Funding Requests</h2>

        {session?.user?.organization?.id === organizationData.id && (
          <Link
            href={`/organization/${organizationData.id}/funding-requests/new`}
          >
            <Button>Create New Funding Request</Button>
          </Link>
        )}
      </div>
      <div className="grid gap-4">
        {organizationData.fundingRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
              <CardDescription>
                ₹{request.currentAmount} raised of ₹{request.goal} goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(request.currentAmount / request.goal) * 100}
                className="mb-2"
              />
              <Button>Donate Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FundingRequests;
