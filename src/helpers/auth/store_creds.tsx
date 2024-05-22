export default function StoreCreds(secretKey: string, accessKey: string) {
  localStorage.setItem("secretKey", secretKey);
  localStorage.setItem("accessKey", accessKey);
}
