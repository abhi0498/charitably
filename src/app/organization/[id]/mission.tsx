"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Organization } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { updateOrganizationMission } from "../actions";

const Mission = ({ organizationData }: { organizationData: Organization }) => {
  const { data: session } = useSession();
  const [missionEdit, setMissionEdit] = useState(false);
  const onSaveMission = async (mission: string) => {
    await updateOrganizationMission(mission, organizationData.id);
    setMissionEdit(false);
  };
  useEffect(() => {
    fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ filename: "test.png" }),
    });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>Our Mission</p>
          {session?.user?.organization?.id === organizationData.id &&
            !missionEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMissionEdit(true);
                }}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
            )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!missionEdit ? (
          <p>{organizationData.mission}</p>
        ) : (
          <MissionEditForm
            defaultMission={organizationData.mission || ""}
            onSaveMission={onSaveMission}
            setMissionEdit={setMissionEdit}
          />
        )}
      </CardContent>
    </Card>
  );
};

const MissionEditForm = ({
  defaultMission,
  onSaveMission,
  setMissionEdit,
}: {
  defaultMission: string;
  onSaveMission: (mission: string) => void;
  setMissionEdit: (missionEdit: boolean) => void;
}) => {
  const [mission, setMission] = useState(defaultMission);
  return (
    <div>
      <Textarea
        placeholder="Enter your mission"
        value={mission}
        rows={5}
        onChange={(e) => setMission(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            setMissionEdit(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSaveMission(mission);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Mission;
