import { Loader2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export default function LoadingButton({value}:{value:string;}){
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      {value}
    </Button>
  )
}