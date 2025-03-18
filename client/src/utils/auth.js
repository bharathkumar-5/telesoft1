export const getAuthHeaders = () => {
    return { Authorization: `Bearer ${localStorage.getItem("token")}` };
  };