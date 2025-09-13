export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private endpoint: string;
  private method: string;
  private body: BodyInit | null;
  private tokens: { refreshToken: string; accessToken: string } = {
    refreshToken: "",
    accessToken: "",
  };

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
    this.endpoint = "";
    this.method = "GET";
    this.body = null;
  }

  public addHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    return this;
  }

  public setMethod(method: string) {
    this.method = method;
    return this;
  }

  public setBody(body: BodyInit | null) {
    this.body = body;
    return this;
  }

  public setTokens() {
    if (
      !localStorage.getItem("refreshToken") ||
      !localStorage.getItem("accessToken")
    ) {
      throw new Error("Tried to set tokens, but no tokens found");
    }

    this.tokens.refreshToken = localStorage.getItem("refreshToken")!;
    this.tokens.accessToken = localStorage.getItem("accessToken")!;

    return this.addHeader("Authorization", `Bearer ${this.tokens.accessToken}`);
  }

  public async request<T>(): Promise<T> {
    const url = `${this.baseUrl}${this.endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.headers,
      } as Record<string, string>,
      method: this.method,
      body: this.body as BodyInit | null,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(`${errorData.message}`);
    }

    return response.json();
  }

  public async requestWithAuthorization<T>(): Promise<T> {
    const url = `${this.baseUrl}${this.endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.headers,
      } as Record<string, string>,
      method: this.method,
      body: this.body as BodyInit | null,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(`${errorData.message}`);
    }

    return response.json();
  }
}
