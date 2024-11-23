export const getPlaceholder = (field) => {
  const placeholders = {
    name: '이름',
    email: '이메일',
    phone: '전화번호 (-를 사용해 주세요)',
    position: '분야',
    major: '전공',
    joinYear: '입사년도',
  };
  return placeholders[field];
};

export const getErrorMessage = (field) => {
  const messages = {
    name: '2글자 이상 입력해 주세요',
    email: '형식을 확인해 주세요 (-----@---.---)',
    phone: '형식을 확인해 주세요 (0xx-xxxx-xxxx)',
    position: '필수정보 입니다',
    major: '필수정보 입니다',
    joinYear: '형식을 확인해 주세요 (xxxx)',
  };
  return messages[field];
};
