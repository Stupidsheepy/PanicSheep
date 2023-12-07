import { ElMessage } from 'element-plus'
const successSubmit = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}
const errorSubmit = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'error',
  })
}

const elMsg = (msg: string, type: string) => {
  if (type === 'success') {
    successSubmit(msg)
  }
  else if (type === 'error') {
    errorSubmit(msg)
  }
}

export default elMsg