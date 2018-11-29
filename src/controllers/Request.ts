interface KeyValue {
  [key: string]: any;
}

export default interface Request<Data = { [key: string]: any }> {
  data: Data;
  setSession(key: string, value: any): void;
}
