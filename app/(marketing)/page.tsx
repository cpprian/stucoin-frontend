"use client"

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export default function Home() {
  const { toast } = useToast() 

  return (
    <Button
      onClick={() => {
        toast({
          variant: "default",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction altText='Try again'>Try again</ToastAction>
          ),
        })
      }}
    >
      Show Toast
    </Button>
  )
}
