import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  { // ignore all setting
    ignores: [
      "*"
    ]
  },
  unocss.configs.flat,


)
