"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function OrganizationApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/organization/apply", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
          mission: formData.get("mission"),
          adminEmail: formData.get("email"),
          adminName: formData.get("adminName"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p>
            Thank you for your interest. We will review your application and
            contact you soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Organization Application</h1>
        <p className="text-muted-foreground">
          Apply to register your organization on Charitably
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Organization Name
            </label>
            <Input id="name" name="name" required />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <Textarea id="description" name="description" required />
          </div>

          <div>
            <label htmlFor="mission" className="block text-sm font-medium mb-1">
              Mission Statement
            </label>
            <Textarea id="mission" name="mission" />
          </div>

          <div>
            <label
              htmlFor="adminName"
              className="block text-sm font-medium mb-1"
            >
              Admin Name
            </label>
            <Input id="adminName" name="adminName" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Admin Email
            </label>
            <Input id="email" name="email" type="email" required />
          </div>

          <Button type="submit">Submit Application</Button>
        </form>
      </CardContent>
    </Card>
  );
}
