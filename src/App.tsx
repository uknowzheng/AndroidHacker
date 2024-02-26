import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "./components/ui/label";


function App() {
  const { toast } = useToast()
  const [apkPath, setApkPath] = useState<string | string[] | null>(null);


  // 2. Define a submit handler.
  const onSubmit = async () => {
    if (!apkPath)
      return;
    const exitCode = await invoke("decompileApk", { path: apkPath });
    if (exitCode) {
      toast({
        variant: "destructive",
        description: `执行失败，错误代码${exitCode}`,
      });
    } else {
      toast({
        description: `执行完成，路径位于${apkPath}目录下.`,
      });
      setApkPath(null);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="mb-2">
          <Label>APK反编译工具</Label>
        </div>
        <div className="flex w-full mx-auto items-center space-x-2 mb-2">
          <Input className="flex-1" value={apkPath || ""} placeholder="请选择要反编译的apk文件" disabled />
          <Button variant="outline" onClick={async () => {
            // Open a selection dialog for image files
            const selected = await open({
              filters: [{
                name: 'APK',
                extensions: ['apk']
              }]
            });
            if (selected === null) {
              return;
            }
            setApkPath(selected);
          }} >选择APK文件</Button>
        </div>
        <div>
          <Button onClick={onSubmit}>开始反编译</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
