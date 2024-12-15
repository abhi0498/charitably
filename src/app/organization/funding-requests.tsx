"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FundingRequests() {
  const [fundingRequests, setFundingRequests] = useState([
    { id: 1, title: "Emergency Medical Supplies", goal: 5000, raised: 2500 },
    { id: 2, title: "School Building Project", goal: 10000, raised: 7500 },
  ]);

  const [newRequest, setNewRequest] = useState({
    title: "",
    goal: "",
    description: "",
  });

  const handleNewRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFundingRequests([
      ...fundingRequests,
      {
        id: fundingRequests.length + 1,
        title: newRequest.title,
        goal: parseFloat(newRequest.goal),
        raised: 0,
      },
    ]);
    setNewRequest({ title: "", goal: "", description: "" });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Current Funding Requests</CardTitle>
          <CardDescription>
            Manage your organization's funding requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {fundingRequests.map((request) => (
              <li
                key={request.id}
                className="flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{request.title}</h3>
                  <p>
                    ${request.raised} raised of ${request.goal} goal
                  </p>
                </div>
                <Button variant="outline">Edit</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Create New Funding Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNewRequestSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newRequest.title}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="goal">Funding Goal ($)</Label>
              <Input
                id="goal"
                type="number"
                value={newRequest.goal}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, goal: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, description: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Create Funding Request</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
