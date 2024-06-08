const config: AwsConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY!,
  },
};

export default config;

export interface AwsConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export interface AwsServiceCostUsage {
  unit: string;
  cost: number;
  usage: number;
  serviceName: string;
  timeperiod: {
    start: string;
    end: string;
  };
}

export interface AwsServiceData {
  unit: string;
  cost?: number;
  usage?: number;
  serviceName: string;
}

export interface AwsServiceUsage {
  timeperiod: {
    start: string;
    end: string;
  };
  usage: number;
  serviceName: string;
}

export interface AwsDataExtracted {
  services: AwsServiceData[];
  serviceUsage: AwsServiceUsage[];
}
