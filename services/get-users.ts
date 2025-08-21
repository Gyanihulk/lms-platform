export const getAllUsers = async () => {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
return data
  }
