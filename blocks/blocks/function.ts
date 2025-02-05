import { CodeIcon } from '@/components/icons'
import { BlockConfig } from '../types'
import { CodeExecutionOutput } from '@/tools/function/execute'

export const FunctionBlock: BlockConfig<CodeExecutionOutput> = {
  type: 'function',
  toolbar: {
    title: 'Function',
    description: 'Add custom logic',
    bgColor: '#FF402F',
    icon: CodeIcon,
    category: 'blocks',
  },
  tools: {
    access: ['function_execute']
  },
  workflow: {
    inputs: {
      code: { type: 'string', required: true }
    },
    outputs: {
      response: {
        type: {
          result: 'any',
          stdout: 'string'
        }
      }
    },
    subBlocks: [
      {
        id: 'code',
        type: 'code',
        layout: 'full',
      }
    ],
  },
}