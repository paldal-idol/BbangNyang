const roomCodeGenerator = (roomList = ['eihj3', '389f9']) => {
  // 참고 : https://velog.io/@josworks27/Back-end-%EB%9E%9C%EB%8D%A4-%EB%AC%B8%EC%9E%90%EC%97%B4%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9E%84%EC%8B%9C-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%83%9D%EC%84%B1
  console.log('start generate code');
  while (1) {
    const randomString = Math.random().toString(36).toUpperCase(); //범위 : 숫자 0~9, 알바펫 A~Z
    const code = randomString.slice(2, 8);
    console.log(code);
    if (!roomList.includes(code)) {
      return code;
    }
  }
};
