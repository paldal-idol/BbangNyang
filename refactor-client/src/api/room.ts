const SERVER_API = import.meta.env.VITE_SERVER_API;

export const createRoomCode = async () => {
  const res = await fetch(SERVER_API + "/room", {
    method: "POST",
  });
  const { code } = await res.json();

  return code;
};

export const validRoomCode = async (code: string) => {
  const res = await fetch(SERVER_API + `/room?code=${code}`, {
    method: "GET",
  });
  const { status } = await res.json();

  return status;
};
