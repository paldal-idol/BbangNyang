export const roomCodeGenerator = (roomList: String[] = ['EF23I', '39DJE']) => {
  console.log('start generate code');
  while (1) {
    const randomString = Math.random().toString(36).toUpperCase(); //범위 : 숫자 0~9, 알바펫 A~Z
    const code = randomString.slice(2, 8);
    if (!roomList.includes(code)) {
      return code;
    }
  }
};
