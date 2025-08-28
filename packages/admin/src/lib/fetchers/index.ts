import { axiosInstance } from "@/lib/axios";
import { supabase } from "@/lib/supabase";
import * as types from "@/types";

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

const getProjects = async () => {
  const { data } = await axiosInstance.get<types.Project[]>("/projects");
  return data;
};

const getProject = async (projectId: string) => {
  const { data } = await axiosInstance.get<types.Project>(
    `/projects/${projectId}`,
  );
  return data;
};

const updateProject = async (
  projectId: string,
  payload: types.ProjectVariables,
) => {
  const { data } = await axiosInstance.patch<types.ProjectMutationResponse>(
    `/projects/${projectId}`,
    payload,
  );
  return data;
};

const deleteProject = async (projectId: string) => {
  const { data } = await axiosInstance.delete<types.ProjectMutationResponse>(
    `/projects/${projectId}`,
  );
  return data;
};

const leaveProject = async (projectId: string) => {
  const { data } = await axiosInstance.delete<types.ProjectMutationResponse>(
    `/projects/${projectId}/leave-project`,
  );
  return data;
};

const createProject = async (payload: types.ProjectVariables) => {
  const { data } = await axiosInstance.post<types.ProjectMutationResponse>(
    "/projects",
    payload,
  );
  return data;
};

const getUserInvites = async () => {
  const { data } = await axiosInstance.get<types.ProjectInvite[]>(
    "/projects/current-user-invites",
  );
  return data;
};

const acceptInvite = async ({ projectId }: { projectId: string }) => {
  const { data } = await axiosInstance.post<object>(
    `/projects/${projectId}/accept-invite`,
  );
  return data;
};

const rejectInvite = async ({ projectId }: { projectId: string }) => {
  const { data } = await axiosInstance.post<object>(
    `/projects/${projectId}/reject-invite`,
  );
  return data;
};

const me = async (cookie?: string) => {
  const { data } = await axiosInstance.get<types.MeResponse>("/users/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

const updateUser = async (payload: { fullName: string }) => {
  const { data } = await axiosInstance.patch<types.MeResponse>(
    "/users/me",
    payload,
  );
  return data;
};

const signup = async (payload: {
  email: string;
  password: string;
  fullName?: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: { fullName: payload.fullName },
    },
  });
  if (error) throw error;
  return data;
};

const signin = async (payload: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword(payload);
  if (error) throw error;
  return data;
};

const verifyEmail = async ({ code }: { code: string }) => {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) throw error;
  return data;
};

const resendVerificationEmail = async ({
  email,
}: {
  email: string;
}) => {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) throw error;
  return data;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

const getFeedbacks = async ({
  projectId,
  params,
}: {
  projectId: string;
  params: {
    cursor: string;
    take: number;
    search?: string;
    category?: types.FeedbackCategory;
    status?: types.FeedbackStatus;
    orderBy?: types.OrderBy;
  };
}) => {
  const { data } = await axiosInstance.get<types.FeedbacksQueryResponse>(
    `/projects/${projectId}/feedbacks`,
    {
      params,
    },
  );

  return data;
};

const getFeedback = async ({
  projectId,
  feedbackId,
}: {
  projectId: string;
  feedbackId: string;
}) => {
  const { data } = await axiosInstance.get<types.Feedback>(
    `/projects/${projectId}/feedbacks/${feedbackId}`,
  );
  return data;
};

const updateFeedbackStatus = async (payload: {
  id: string;
  projectId: string;
  status: types.FeedbackStatus;
}) => {
  const { data } = await axiosInstance.patch<types.Feedback>(
    `/projects/${payload.projectId}/feedbacks/${payload.id}/status`,
    payload,
  );
  return data;
};

const inviteMember = async (
  projectId: string,
  payload: { email: string; role: string },
) => {
  const { data } = await axiosInstance.post<object>(
    `/projects/${projectId}/invite`,
    payload,
  );
  return data;
};

const deleteMember = async (projectId: string, memberId: string) => {
  const { data } = await axiosInstance.delete<object>(
    `/projects/${projectId}/member/${memberId}`,
  );
  return data;
};

const updateMemberRole = async (
  projectId: string,
  memberId: string,
  payload: {
    role: types.ProjectMemberRole;
  },
) => {
  const { data } = await axiosInstance.patch<object>(
    `/projects/${projectId}/member/${memberId}`,
    payload,
  );
  return data;
};

const cancelInvite = async (projectId: string, inviteId: string) => {
  const { data } = await axiosInstance.delete<object>(
    `/projects/${projectId}/invite/${inviteId}`,
  );
  return data;
};

const getProjectTeam = async (projectId: string) => {
  const { data } = await axiosInstance.get<types.ProjectTeam>(
    `/projects/${projectId}/team`,
  );
  return data;
};

export const fetchers = {
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  leaveProject,
  createProject,
  getUserInvites,
  acceptInvite,
  rejectInvite,
  me,
  updateUser,
  signup,
  signin,
  verifyEmail,
  resendVerificationEmail,
  logout,
  getFeedbacks,
  getFeedback,
  updateFeedbackStatus,
  inviteMember,
  deleteMember,
  updateMemberRole,
  cancelInvite,
  getProjectTeam,
};
