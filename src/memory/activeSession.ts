import type { Schema } from "mongoose"



type AttendanceStatus = "present" | "absent";

interface ActiveSession {
  classId: string;
  startedAt: string; // ISO 8601 string
  attendance: Record<string, AttendanceStatus>;
}




export let activeSessions: ActiveSession | null;