"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminOrganizationsPage() {
  const [orgData, setOrgData] = useState({
    name: "",
    description: "",
    taxId: "",
    adminEmail: "",
  });

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
              onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
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
  );
}
