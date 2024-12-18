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
import { useSession } from "next-auth/react";
import {
  closeFundingRequest,
  createFundingRequest,
  updateFundingRequest,
} from "./actions";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface FundingRequestsProps {
  organizationData: {
    id: string;
    fundingRequests: {
      id: string;
      title: string;
      description: string;
      goal: number;
      currentAmount: number;
      createdAt: Date;
      updatedAt: Date;
      orgId: string;
    }[];
  };
}

export const getServerComponentProps = async () => {};

export function FundingRequests({ organizationData }: FundingRequestsProps) {
  const { data: session } = useSession();
  const [formState, setFormState] = useState("");
  const [newRequest, setNewRequest] = useState({
    title: "",
    goal: "",
    description: "",
  });
  const router = useRouter();
  const handleNewRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newRequest.title);
    formData.append("goal", newRequest.goal);
    formData.append("description", newRequest.description);
    if (formState === "create") {
      await createFundingRequest(formData, organizationData.id);
    } else {
      await updateFundingRequest(formData, formState, organizationData.id);
    }
    setNewRequest({ title: "", goal: "", description: "" });
    setFormState("");
    // router.refresh();
  };

  return (
    <>
      {!formState ? (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Funding Requests</div>
                {session?.user?.organization?.id === organizationData.id && (
                  <Button onClick={() => setFormState("create")}>
                    Create New Funding Request
                  </Button>
                )}
              </div>
            </CardTitle>
            {session?.user?.organization?.id === organizationData.id && (
              <CardDescription>
                Manage your organization&apos;s funding requests
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {organizationData.fundingRequests.map((request) => (
                <li key={request.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p>
                        ₹{request.currentAmount || 0} raised of ₹{request.goal}{" "}
                        goal
                      </p>
                    </div>
                    {!request.isClosed &&
                      (session?.user?.organization?.id ===
                      organizationData.id ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setFormState(request.id);
                              setNewRequest({
                                title: request.title,
                                goal: request.goal.toString(),
                                description: request.description,
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              closeFundingRequest(
                                request.id,
                                organizationData.id
                              );
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button variant="outline">Donate</Button>
                        </>
                      ))}
                  </div>
                  <Progress
                    className="mt-3"
                    value={(request.currentAmount / request.goal) * 100}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>
                  {formState === "create"
                    ? "Create New Funding Request"
                    : "Edit Funding Request"}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => handleNewRequestSubmit(e)}
              className="space-y-4"
            >
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
                <Label htmlFor="goal">Funding Goal (₹)</Label>
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
                    setNewRequest({
                      ...newRequest,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end gap-5">
                <Button variant="outline" onClick={() => setFormState("")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {formState === "create"
                    ? "Create Funding Request"
                    : "Update Funding Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
