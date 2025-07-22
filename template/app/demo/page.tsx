import { Chat } from "../../components/chat/Chat";
import { CustomizationDemo } from "../../components/CustomizationDemo";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Chat Demo</h1>
      <Chat />
      <CustomizationDemo />
    </div>
  );
} 