import { AxiosError } from "axios";
import apiClient from "./api-client";
import { MessageResponse, DataResponse } from "../types/responses";

type Id = string | number;
type Entity = {
  id?: Id;
};

class HttpService<T extends Entity> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `/api/${endpoint}`.replace(/\/+/g, "/");
  }

  async getAll(query?: Record<string, string | number>) {
    const response = await apiClient.get<DataResponse<T[]>>(this.endpoint, {
      params: query,
    });
    return response.data;
  }

  async getOne(id: Id) {
    const response = await apiClient.get<DataResponse<T>>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  async create(entity: Omit<T, "id">) {
    const response = await apiClient.post<DataResponse<T> & MessageResponse>(
      this.endpoint,
      entity
    );
    return response.data;
  }

  async update(entity: Partial<T>) {
    if (!entity.id) throw new AxiosError("Entity must have an id");

    const response = await apiClient.put<DataResponse<T> & MessageResponse>(
      `${this.endpoint}/${entity.id}`,
      entity
    );
    return response.data;
  }

  async delete(id: Id) {
    const response = await apiClient.delete<MessageResponse>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }
}

function createService<T extends Entity>(endpoint: string) {
  return new HttpService<T>(endpoint);
}

export default createService;
