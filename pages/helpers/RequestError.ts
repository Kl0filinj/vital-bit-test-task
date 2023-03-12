interface IstatusMessage {
  [key: number]: string;
}

const messages: IstatusMessage = {
  200: "Successful",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};

export default function RequestError(
  status: number,
  message: string = messages[status]
) {
  const error: any = new Error(message);
  error.status = status;
  return error;
}
