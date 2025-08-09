export enum AppointmentStatus {
    Pending = "pending",
    Approve = "approve",
    Rejected = "reject",
}
export interface Appointment {
    id: string;
    guest_name: string;
    guest_email: string;
    date_time: string;
    service_id: string;
    status: AppointmentStatus;
}

export interface FetchAppointmentsParams {
    page: number;
    per_page: number;
}

export interface CreateAppointmentParams {
    appointment: Omit<Appointment, "status" | "id">;
    nutritionist_id: string;
}
