import axios from 'axios'

export const getMembers = async () => {
  try {
    const res = await axios.get('http://222.117.237.119:8111/users/list')
    return res.data.filter((member) => member.email != null)
  } catch (err) {
    console.log(err)
  }
}

export const setMembers = async (payload) => {
  try {
    const res = await axios.post('http://222.117.237.119:8111/auth/signup', payload)
    if (res.data) {
      console.error('회원 가입 성공')
      return true
    } else {
      console.error('회원 가입 실패')
      return false
    }
  } catch (err) {
    console.error(err)
    alert('가입 실패! 서버 오류 발생')
    return false
  }
}
