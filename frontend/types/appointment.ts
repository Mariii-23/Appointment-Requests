export enum AppointmentStatus {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected",
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
    status?: AppointmentStatus;
}

export interface CreateAppointmentParams {
    appointment: Omit<Appointment, "status" | "id">;
    nutritionist_id: string;
}
