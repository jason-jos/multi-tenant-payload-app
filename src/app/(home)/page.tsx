import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
  <div className="m-4 gap-4">
   <div   className="bg-blue-400 max-w-sm m-3" ><h1 className="p-2 rounded-lg text-center">Hello</h1></div>
   <Button variant={"elevated"}>Click</Button>
   <Progress className=" m-2"color={"red"}></Progress>
   <Textarea placeholder="Type here"></Textarea>
  </div>
  );
}
