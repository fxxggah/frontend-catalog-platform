import { api, unwrap } from "./api";
import type {
  InviteValidationResponse,
  StoreInviteRequest,
  StoreInviteResponse,
} from "@/types";

export const inviteService = {
  async validateInvite(token: string): Promise<InviteValidationResponse> {
    return unwrap(
      await api.get<InviteValidationResponse>(`/invites/validate/${token}`)
    );
  },

  async acceptInvite(token: string): Promise<void> {
    await api.post(`/invites/accept/${token}`);
  },

  async getStoreInvites(storeSlug: string): Promise<StoreInviteResponse[]> {
    return unwrap(
      await api.get<StoreInviteResponse[]>(
        `/admin/stores/${storeSlug}/invites`
      )
    );
  },

  async createInvite(
    storeSlug: string,
    payload: StoreInviteRequest
  ): Promise<StoreInviteResponse> {
    return unwrap(
      await api.post<StoreInviteResponse>(
        `/admin/stores/${storeSlug}/invites`,
        payload
      )
    );
  },

  async cancelInvite(storeSlug: string, inviteId: number): Promise<void> {
    await api.delete(`/admin/stores/${storeSlug}/invites/${inviteId}`);
  },
};