"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { OrganizationApplication } from "@prisma/client";
import { approveOrganization } from "./actions";
import { rejectOrganization } from "./actions";

export default function CreateOrganizationPage({
  applications,
}: {
  applications: OrganizationApplication[];
}) {
  const [orgData, setOrgData] = useState({
    name: "",
    description: "",
    taxId: "",
    adminEmail: "",
  });

  const handleApprove = async (id: string) => {
    await approveOrganization(id);
  };

  const handleReject = async (id: string) => {
    await rejectOrganization(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orgData),
      });

      if (response.ok) {
        setOrgData({
          name: "",
          description: "",
          taxId: "",
          adminEmail: "",
        });
        alert("Organization created successfully!");
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("Failed to create organization");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <CardTitle>{application.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Description:</strong> {application.description}
              </p>
              <p>
                <strong>Mission:</strong> {application.mission}
              </p>
              <p>
                <strong>Admin Email:</strong> {application.adminEmail}
              </p>
              <p>
                <strong>Tax ID:</strong> {application.taxId}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={() => handleApprove(application.id)}>
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(application.id)}
              >
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Create Organization</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Name
              </label>
              <Input
                value={orgData.name}
                onChange={(e) =>
                  setOrgData({ ...orgData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Input
                value={orgData.description}
                onChange={(e) =>
                  setOrgData({ ...orgData, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tax ID</label>
              <Input
                value={orgData.taxId}
                onChange={(e) =>
                  setOrgData({ ...orgData, taxId: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Admin Email
              </label>
              <Input
                type="email"
                value={orgData.adminEmail}
                onChange={(e) =>
                  setOrgData({ ...orgData, adminEmail: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit">Create Organization</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
