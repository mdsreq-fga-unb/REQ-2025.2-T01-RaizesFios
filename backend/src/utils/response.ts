export function success(data: any) {
  return { success: true, data };
}

export function error(message: string) {
  return { success: false, message };
}
