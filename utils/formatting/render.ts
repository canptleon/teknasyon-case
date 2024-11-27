export const getNativeWebDevice = (userAgent: string) => {
  const userAgentLower = userAgent.toLowerCase();

  if (/iphone|ipod|ipad/.test(userAgentLower)) {
    return "Mobile";
  } else if (/android/.test(userAgentLower)) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};