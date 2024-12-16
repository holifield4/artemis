//separate camelCase keys
export function NamingHelper(key: string) {
  if (/[a-z]/.test(key) && /[A-Z]/.test(key)) {
    return key.replace(/([a-z])([A-Z])/g, "$1 $2");
  }
  return key;
}
