import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
// Assuming custom icons exist for Sim specific things, otherwise use Lucide
import { AgentIcon, ConnectIcon, StartIcon, SlackIcon } from '@/components/icons' 
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CodeXml, 
  Circle, // For header icon
  Square, // For header icon
  ChevronDown, // For dropdowns
  Plus, // For Add Tool button
  PlusIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/code-block'
// Removed DotPattern import

// Configuration for the new block types based on the image
const blockConfig = {
  start: {
    icon: StartIcon, // Assuming a custom StartIcon
    color: '#2563eb', // Blue
    name: 'Start',
  },
  function: {
    icon: CodeXml,
    color: '#e11d48', // Red
    name: 'Function 1',
  },
  agent: {
    icon: AgentIcon, // Assuming custom AgentIcon
    color: '#9333ea', // Purple
    name: 'Agent 1',
  },
  router: {
    icon: ConnectIcon, // Assuming custom ConnectIcon
    color: '#16a34a', // Green
    name: 'Router 1',
  },
  slack: {
    icon: SlackIcon, // Assuming custom SlackIcon
    color: '#611F69', // Slack-like color (adjust if needed)
    name: 'Slack 1',
  },
}

export const HeroBlock = memo(({ data }: NodeProps) => {
  const type = data.type as keyof typeof blockConfig;
  const config = blockConfig[type] || blockConfig.function; 
  const Icon = config.icon;
  const nodeName = config.name;
  const iconBgColor = config.color; // Get color from config

  return (
    // Apply group relative here for handles
    <div className="flex flex-col items-center group relative opacity-70">
      {/* Left Handle - Attached to outer div */}
        <Handle
          type="target"
          position={Position.Left}
          className={cn(
            '!w-4 !h-7 !bg-[#363636] !rounded-r-sm !border-none !left-[-1px] !opacity-0 group-hover:!opacity-100 transition-opacity z-10' // Use opacity, ensure z-index
          )}
          isConnectable={false}
        />

       {/* Use BlockCard, passing Icon, title, and iconBgColor */}
       <BlockCard Icon={Icon} iconBgColor={iconBgColor} title={nodeName}>
           {/* Render type-specific content as children */}
           <div className="pt-3 text-sm space-y-3">
              {/* --- Start Block Content --- */}
              {type === 'start' && (
                <>
                  <div className="text-base font-medium text-[#7D7D7D]">Start workflow</div>
                  <Container>
                    <p>
                      Run Manually
                    </p>
                    <ChevronDown size={14}/>
                  </Container>
                </>
              )}

              {/* --- Function Block Content --- */}
              {type === 'function' && (
                <>
                  <div className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                    <CodeBlock code='Write javascript..' className='text-[#7C7C7C] font-geist-mono w-full min-h-32 bg-[#212121] border-[#282828] p-0'/>
                  </div>
                </>
              )}

              {/* --- Agent Block Content --- */}
              {type === 'agent' && (
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-base font-medium text-[#7D7D7D]'>
                      Agent
                    </p>
                    <Container>
                      Enter System Prompt
                    </Container>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-base font-medium text-[#7D7D7D]'>
                      User Prompts
                    </p>
                    <Container>
                      Enter Context
                    </Container>
                  </div>
                  <div className='flex gap-3 w-full'>
                    <div className='flex flex-col w-full gap-2'>
                      <p className='text-base font-medium text-[#7D7D7D]'>
                      Model
                      </p>
                      <Container>
                        <p>
                          GPT-4o
                        </p>
                        <ChevronDown size={14}/>
                      </Container>
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                      <p className='text-base font-medium text-[#7D7D7D]'>
                      Tools
                      </p>
                      <Container className='justify-center gap-1'>
                        <PlusIcon size={14}/>
                        Add Tools
                      </Container>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Router Block Content --- */}
              {type === 'router' && (
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-base font-medium text-[#7D7D7D]'>
                    Prompt
                  </p>
                  <Container className='min-h-32 items-start'>
                    Enter Prompt
                  </Container>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-base font-medium text-[#7D7D7D]'>
                    Model
                  </p>
                  <Container>
                    <p>
                      GPT-4o
                    </p>
                    <ChevronDown size={14}/>
                  </Container>
                </div>
              </div>
              )}

              {/* --- Slack Block Content --- */}
              {type === 'slack' && (
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-base font-medium text-[#7D7D7D]'>
                      Channel
                    </p>
                    <Container>
                      Enter Slack channel (#general)
                    </Container>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-base font-medium text-[#7D7D7D]'>
                      Message
                    </p>
                    <Container className='items-start min-h-32'>
                      <p>
                        Enter your alert message
                      </p>
                    </Container>
                  </div>
                </div>
              )}
           </div>
       </BlockCard>

        {/* Right Handle - Attached to outer div */}
       <Handle
          type="source"
          position={Position.Right}
          className={cn(
            '!w-4 !h-7 !bg-[#363636] !rounded-l-sm !border-none !right-[-1px] !opacity-0 group-hover:!opacity-100 transition-opacity z-10' // Use opacity, ensure z-index
          )}
           isConnectable={false}
        />
    </div>
  )
})

const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={cn("flex px-3 py-2 items-center bg-[#212121] border border-[#282828] rounded-xl text-sm text-[#7C7C7C] font-normal justify-between", className)}>
      {children}
    </div>
  )
}

// Modify BlockCard to accept and use iconBgColor prop
const BlockCard = ({Icon, iconBgColor, title, children}: {
  Icon: any; 
  iconBgColor: string; 
  title: string; 
  children: React.ReactNode
}) => {
   return (
     <div className='rounded-xl flex flex-col bg-[#131313] border border-[#333333] w-[280px] min-h-[100px] shadow-[0px_0px_6px_3px_rgba(255,_255,_255,_0.05)]'>
       <div className='border-b border-[#262626] flex items-center gap-2 px-4 pt-4 pb-3'>  
           {/* Apply background color using inline style */}
           <div 
             className={`w-6 h-6 rounded flex items-center justify-center`} 
             style={{ backgroundColor: iconBgColor }} // Use inline style
           >
              <Icon className="w-4 h-4 text-white" /> 
           </div>
           <p className='font-semibold text-base text-neutral-200'> 
            {title}
          </p>
       </div>
       <div className="flex-grow p-4 pt-0">
          {children}
        </div>
     </div>
   )
 }

HeroBlock.displayName = 'HeroBlock'
