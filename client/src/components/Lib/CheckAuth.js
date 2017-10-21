export function checkUser (user) {
  if (user.token != null) {
    const createdDate = new Date(user.created);
    const created = Math.round(createdDate.getTime()/1000);
    const expiry = created + user.ttl;
    const now = Math.round(new Date().getTime()/1000);
    if (now > expiry) {
      return false;
    }
    return true;
  }
  return false;
}
