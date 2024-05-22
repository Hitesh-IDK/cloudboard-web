const config = {
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
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

export interface AwsServiceCost {
  unit: string;
  cost: number;
  serviceName: string;
  timeperiod: {
    start: string;
    end: string;
  };
}

export interface AwsServiceUsage {
  unit: string;
  usage: number;
  serviceName: string;
  timeperiod: {
    start: string;
    end: string;
  };
}
